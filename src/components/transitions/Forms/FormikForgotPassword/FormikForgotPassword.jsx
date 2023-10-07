"use client";
import Link from "next/link";
import ButtonMain from "../../Button/ButtonMain";
import InputFormik from "../../Input/InputFormik";
import styles from "../../../../styles/components/transitions/Forms/CommonLoginRegister.module.scss";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Formik, Form } from "formik";
import {
	forgotLinkSchema,
	forgotNewPasswordSchema,
} from "@/components/Schemas/FormSchem";
import { useMediaQuery } from "react-responsive";
import { showResult, toggleLoading } from "@/global/notification-slice";
import { useDispatch } from "react-redux";

const FormikForgotPassword = ({ className, ...props }) => {
	const temporaryStatus = false;
	const schema = temporaryStatus ? forgotNewPasswordSchema : forgotLinkSchema;

	const router = useRouter();
	const classes = `${styles["logreg-box"]} ${className}`;
	const { data: session, status } = useSession();
	const isMediumScreen = useMediaQuery({
		query: "(min-width: 768px)",
	});

	const isClient = typeof window !== "undefined";

	if (!isMediumScreen && isClient) {
		window.scrollTo(0, 100);
	}

	const dispatchLoading = useDispatch(toggleLoading);
	const dispatchNotification = useDispatch(showResult);

	useEffect(() => {
		if (status === "authenticated" && session) {
			router.push("/");
		}
	}, [session, status]);

	const changeWebstiteHandler = async event => {
		event.preventDefault();

		const form = document
			.getElementById("form")
			.classList.toggle(styles.active);

		setTimeout(() => {
			router.push("/rejestracja");
		}, 500);
	};

	const onSubmit = async values => {
		const email = values.email;
		const password = values.password;
		dispatchLoading(toggleLoading());

		const message = {
			subject: "Link resetujący hasło.",
			text: "Otrzymaliśmy zgłoszenie ,odnośnie utracenia hasła. Jeżeli to nie Ty wysłałeś tą wiadomość ,prosimy ją zignorować. \n Link jest ważny przez 24h. Poniżej znajduje się link.",
		};
		let clientActivationLinks;

		// try {
		// 	clientActivationLinks = await connectDbMongo("ActivationLinks");
		// 	const generatedIdLink = await generationIdLink(ip, userAgent);

		// 	const resultOfCreatedActivationLink = await insertDocumentWithTTL(
		// 		clientActivationLinks,
		// 		"Registration",
		// 		{
		// 			email: email,
		// 			generatedIdLink: generatedIdLink,
		// 			createdAt: new Date(),
		// 		},
		// 		86400
		// 	);

		// 	if (resultOfCreatedActivationLink.acknowledged);
		// 	{
		// 		await sendActivationLink(
		// 			email,
		// 			generatedIdLink,
		// 			message.subject,
		// 			message.text
		// 		);
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// 	return NextResponse.json(
		// 		{
		// 			error:
		// 				"Zarejestrowany pomyślnie ,jednak nie udało się utworzyć linku aktywacyjnego. Wyślemy go do Ciebie ,jak najszybciej!",
		// 		},
		// 		{ status: 400 }
		// 	);
		// }

		// try {
		// 	const response = await signIn("credentials", {
		// 		redirect: false,
		// 		email: email,
		// 		password: password,
		// 	});

		// 	if (response.error) {
		// 		dispatchNotification(
		// 			showResult({ message: response.error, variant: "warning" })
		// 		);
		// 		dispatchLoading(toggleLoading());
		// 		return;
		// 	}
		// } catch (error) {
		// 	dispatchNotification(
		// 		showResult({
		// 			message: "Coś poszło nie tak. Skontaktuj się z administratorem.",
		// 			variant: "warning",
		// 		})
		// 	);
		// 	dispatchLoading(toggleLoading());
		// }

		// dispatchNotification(
		// 	showResult({ message: "Witamy ponownie!", variant: "success" })
		// );
		// dispatchLoading(toggleLoading());
	};

	return (
		<FormContainerBlur className={classes} id='form'>
			<Formik
				initialValues={{
					email: "",
					password: "",
					confirmPassword: "",
					code: "",
				}}
				onSubmit={onSubmit}
				validationSchema={schema}>
				{props => (
					<Form>
						<h1>Zapomniałeś hasła?</h1>

						{!temporaryStatus && (
							<InputFormik
								name='email'
								placeholder='Email'
								aria-label='Email'
								type='text'
							/>
						)}
						{temporaryStatus && (
							<>
								<InputFormik
									name='password'
									placeholder='Nowe hasło'
									aria-label='Nowe hasło'
									type='password'
								/>
								<InputFormik
									name='confirmPassword'
									placeholder='Powtórz hasło'
									aria-label='Powtórz hasło'
									type='password'
								/>
								<InputFormik
									name='code'
									placeholder='Kod resetujący hasło'
									aria-label='Kod resetujący hasło'
									type='text'
								/>
							</>
						)}

						<ButtonMain type='submit' variant={"btnSkewRight"}>
							{temporaryStatus ? "Zmień hasło" : "Zresetuj hasło"}
						</ButtonMain>

						<p>
							Nie masz konta?
							<Link href='/rejestracja' onClick={changeWebstiteHandler}>
								Zarejestruj
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</FormContainerBlur>
	);
};

export default FormikForgotPassword;
