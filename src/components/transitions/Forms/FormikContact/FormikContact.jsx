"use client";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import ButtonMain from "../../Button/ButtonMain";
import InputFormik from "../../Input/InputFormik";
import TextareaFormik from "../../Input/TextareaFormik";
import IconRender from "@/components/Icons/IconRender";
import styles from "../../../../styles/components/transitions/Forms/FormikContact.module.scss";
import { Formik, Form } from "formik";
import { contactSchema } from "@/components/Schemas/FormSchem";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { showResult } from "@/global/notification-slice";

const FormikContact = ({ className, dict, lang, ...props }) => {
	const { trl_title, trl_email, trl_subject, trl_message, trl_btn, trl_error } =
		dict;

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
		const subject = values.title;
		const message = values.message;
		let data;

		try {
			const response = await fetch("/api/sendMessage", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, subject, message, lang }),
			});

			data = await response.json();

			if (!response.ok) {
				dispatch(
					showResult({
						message: data.error,
						variant: "warning",
					})
				);
				return;
			}
		} catch (error) {
			dispatch(
				showResult({
					message: trl_error,
					variant: "warning",
				})
			);
			return;
		}

		dispatch(
			showResult({
				message: data.message,
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
					title: "",
					message: "",
				}}
				onSubmit={onSubmit}
				validationSchema={contactSchema}>
				{props => (
					<Form>
						<h1>{trl_title}</h1>
						<InputFormik
							name='email'
							placeholder={trl_email}
							aria-label={trl_email}
							type='text'
						/>
						<InputFormik
							name='title'
							placeholder={trl_subject}
							aria-label={trl_subject}
							type='text'
						/>
						<label htmlFor='message' className={styles["logreg-box__message"]}>
							<IconRender variant='description' />
							<p>{trl_message}:</p>
						</label>
						<TextareaFormik name='message' id='message' />
						<ButtonMain type='submit' variant={"btnSkewRight"}>
							{trl_btn}
						</ButtonMain>
					</Form>
				)}
			</Formik>
		</FormContainerBlur>
	);
};

export default FormikContact;
