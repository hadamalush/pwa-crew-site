import HomeStartContent from "@/components/Common/HomeStartContent";
import { connectDbMongo, deleteDocument, findDocument, updateDocument } from "@/lib/mongodb";
import { insertLimitByIp } from "@/lib/protection/protection";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getDictionaryElements } from "@/app/dictionaries/rest/dictionaries";

const ActivationPage = async ({ params: { activationId, lang } }) => {
  const dict = await getDictionaryElements(lang);

  const ip = headers().get("x-forwarded-for");

  let isValid = false,
    status,
    foundDocument,
    clientActivationLinks;

  //limit request for ip ,because we didnt want
  const result = await insertLimitByIp("ActivationPage", ip, 5, 86400);

  if (result?.limit) {
    redirect("/");
  }

  try {
    clientActivationLinks = await connectDbMongo("ActivationLinks");
  } catch (error) {
    return (status = 503);
  }

  try {
    foundDocument = await findDocument(clientActivationLinks, "Registration", {
      generatedIdLink: activationId,
    });
  } catch (error) {
    return (status = 500);
  }

  if (!foundDocument) {
    redirect("/");
  }

  if (foundDocument && !status) {
    const { email } = foundDocument;
    let clientAuth;

    try {
      clientAuth = await connectDbMongo("Auth");
    } catch (error) {
      return (status = 503);
    }

    try {
      const updatedDocument = await updateDocument(
        clientAuth,
        "Users",
        { email: email },
        { $set: { isActivated: true } }
      );
      if (updatedDocument.acknowledged) {
        const deletedDocument = await deleteDocument(clientActivationLinks, "Registration", {
          email: email,
        });

        isValid = deletedDocument.acknowledged && true;
      }
    } catch (error) {
      return (status = 500);
    }
  }

  const statusCode = status ? `Status: ${status}` : "";

  const validTextFirst = dict.activation.valid.textFirst;
  const validTextSecond = dict.activation.valid.textSecond;
  const inValidTextFirst = dict.activation.inValid.textFirst;
  const inValidTextSecond = dict.activation.inValid.textFirst;
  const btns = {
    btn_registration: dict.activation.btns.btn_registration,
    btn_events: dict.activation.btns.btn_events,
    btn_cooperation: dict.activation.btns.btn_cooperation,
  };

  const title = isValid ? validTextFirst : `${inValidTextFirst} ${statusCode}`;
  const text = isValid ? validTextSecond : inValidTextSecond;

  return (
    <HomeStartContent
      title={title}
      text={text}
      lang={lang}
      btn_registration={btns.btn_registration}
      btn_events={btns.btn_events}
      btn_cooperation={btns.btn_cooperation}
    />
  );
};

export default ActivationPage;
