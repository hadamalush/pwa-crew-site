"use client";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import ButtonMain from "../../Button/ButtonMain";
import InputFormik from "../../Input/InputFormik";
import TextareaFormik from "../../Input/TextareaFormik";
import IconRender from "@/components/Icons/IconRender";
import styles from "../../../../styles/components/transitions/Forms/FormikContact.module.scss";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { contactSchema } from "@/components/Schemas/FormSchem";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { showResult } from "@/global/notification-slice";

const FormikContact = ({ className, ...props }) => {
	const router = useRouter();
	const classes = `${styles["logreg-box"]} ${className}`;
	const isMediumScreen = useMediaQuery({
		query: "(min-width: 768px)",
	});

	const isClient = typeof window !== "undefined";

	if (!isMediumScreen && isClient) {
		window.scrollTo(0, 100);
	}

	const dispatch = useDispatch(showResult);

	const onSubmit = async (values, actions) => {
		const email = values.email;
		const password = values.password;
		const confirmPassword = values.confirmPassword;
		const terms = values.terms;

		try {
			const response = await fetch("/api/auth/registration", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, confirmPassword, terms }),
			});

			const data = await response.json();

			if (!response.ok) {
				dispatch(
					showResult({
						message: data.message,
						variant: "warning",
					})
				);
				return;
			}
		} catch (error) {
			console.log(error);
			return;
		}

		dispatch(
			showResult({
				message: "Udało się zarejestrować",
				variant: "success",
			})
		);
		router.push("/");
	};

	return (
		<FormContainerBlur className={classes} id='form'>
			<Formik
				initialValues={{
					email: "",
					password: "",
					confirmPassword: "",
					terms: false,
				}}
				onSubmit={onSubmit}
				validationSchema={contactSchema}>
				{props => (
					<Form>
						<h1>Formularz kontaktowy</h1>
						<InputFormik
							name='email'
							placeholder='Email'
							aria-label='Email'
							type='text'
						/>
						<InputFormik
							name='title'
							placeholder='Tytuł'
							aria-label='Tytuł'
							type='text'
						/>
						<label htmlFor='message' className={styles["logreg-box__message"]}>
							<IconRender variant='description' />
							<p>Wiadomość: </p>
						</label>
						<TextareaFormik name='message' id='message' />
						<ButtonMain type='submit' variant={"btnSkewRight"}>
							Wyślij wiadomość
						</ButtonMain>
					</Form>
				)}
			</Formik>
		</FormContainerBlur>
	);
};

export default FormikContact;
