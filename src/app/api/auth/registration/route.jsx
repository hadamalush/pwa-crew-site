import { cryptPassword } from "@/lib/crypt";
import {
  connectDatabase,
  connectDbMongo,
  findDocument,
  insertDocument,
  insertDocumentWithTTL,
} from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { generationIdLink, sendActivationLink } from "@/lib/message/message";
import { getDictionaryNotifi } from "@/app/dictionaries/notifications/dictionaries";
import { addNotification } from "@/lib/crud";

export async function POST(request) {
  const apikey = request.headers.get("authorization")?.split(" ")[1];

  if (!apikey || apikey !== process.env.NEXT_PUBLIC_API_KEY) {
    return NextResponse.json({ message: "No access!" }, { status: 422 });
  }

  const data = await request.json();
  const ip = headers().get("x-forwarded-for");
  const userAgent = headers().get("user-agent");

  const { email, password, confirmPassword, terms, lang } = data;
  const dict = await getDictionaryNotifi(lang);

  const notification = {
    trl_err_409: dict.notifications.registration.err_409,
    trl_err_422: dict.notifications.err_422,
    trl_err_500: dict.notifications.err_500,
    trl_errSendLink: dict.notifications.registration.err_sendLink,
    trl_generalError: dict.notifications.registration.generalError,
    trl_success: dict.notifications.registration.success,
  };

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7 ||
    password !== confirmPassword ||
    !terms
  ) {
    return NextResponse.json({ message: notification.trl_err_409 }, { status: 422 });
  }

  let client, clientNotifi;

  try {
    client = await connectDatabase();
  } catch (error) {
    return NextResponse.json({ message: notification.trl_err_500 }, { status: 500 });
  }

  let existingUser;

  try {
    existingUser = await findDocument(client, "Users", { email: email });
  } catch (error) {
    client.close();
    return NextResponse.json({ message: notification.trl_generalError }, { status: 422 });
  }

  if (existingUser) {
    client.close();
    return NextResponse.json(
      {
        message: notification.trl_err_409,
      },
      { status: 409 }
    );
  }

  const hashedPassword = await cryptPassword(password);

  try {
    await insertDocument(client, "Users", {
      email: email,
      password: hashedPassword,
      isActivated: false,
    });
  } catch (error) {
    client.close();
    return NextResponse.json(
      {
        message: notification.trl_generalError,
      },
      { status: 305 }
    );
  }

  const message = {
    subject: "Link aktywacyjny na stronie PwaCrew.",
    text: "Dziękujemy za zarejestrowanie się, poniżej znajduję się link aktywacyjny.",
  };
  let clientActivationLinks;

  try {
    clientActivationLinks = await connectDbMongo("ActivationLinks");
    const generatedIdLink = await generationIdLink(ip, userAgent);
    const linkPrefix = `${lang}/activation`;

    const resultOfCreatedActivationLink = await insertDocumentWithTTL(
      clientActivationLinks,
      "Registration",
      {
        email: email,
        generatedIdLink: generatedIdLink,
        createdAt: new Date(),
      },
      86400
    );

    if (resultOfCreatedActivationLink.acknowledged);
    {
      await sendActivationLink(email, generatedIdLink, message.subject, message.text, linkPrefix);
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: notification.trl_errSendLink,
      },
      { status: 400 }
    );
  }

  try {
    clientNotifi = await connectDbMongo("Users");
  } catch (error) {
    console.log("Failed connection to users databse.");
  }

  const dataNotifi = {
    email: email,
    actionTextPL: "Zarejestrowałeś się pomyślnie.",
    actionTextEN: "Registered success",
    action: "create",
    status: "new",
  };

  try {
    const result = await addNotification(clientNotifi, "Notifications", dataNotifi);
  } catch (err) {
    console.log("Failed to add notification");
  }

  client.close();
  clientActivationLinks.close();
  return NextResponse.json({
    message: notification.trl_success,
  });
}
