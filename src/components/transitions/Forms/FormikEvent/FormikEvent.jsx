"use client";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import InputFormik from "../../Input/InputFormik";
import InputFormikFile from "../../Input/InputFormikFile";
import ButtonMain from "../../Button/ButtonMain";
import styles from "../../../../styles/components/transitions/Forms/FormikEvent.module.scss";
import { Formik, Form } from "formik";
import { eventSchema } from "@/components/Schemas/FormSchem";

/**
 * @description This component returns form for create new event.
 * @returns Reuturns the whole form component. Should be wrapped with WrapperFormWithContent. However if you want you can pass this component withoud that wrapper.
 */

const FormikEvent = () => {
	const addEventhandler = async values => {
		console.log(values.fileImg);

		try {
			const response = await fetch("/api/addEvent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: values.title,
					town: values.town,
					codePost: values.codePost,
					street: values.street,
					date: values.date,
					time: values.time,
					fileImg: values.fileImg,
				}),
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FormContainerBlur>
			<Formik
				initialValues={{
					title: "",
					town: "",
					codePost: "",
					street: "",
					date: "",
					time: "",
					fileImg: "",
				}}
				onSubmit={addEventhandler}
				validationSchema={eventSchema}
				className={styles.form}>
				{({ setFieldValue, setFieldTouched, ...props }) => (
					<Form className={styles.form}>
						<h1>Dodawanie wydarzenia</h1>

						<InputFormik
							name='title'
							placeholder='Tytuł wydarzenia'
							aria-label='Tytuł wydarzenia'
							type='text'
						/>
						<InputFormik
							name='town'
							placeholder='Miejscowość'
							aria-label='Miejscowość'
							type='text'
						/>
						<InputFormik
							name='codePost'
							placeholder='Kod pocztowy'
							aria-label='Kod pocztowy'
							type='text'
						/>
						<InputFormik
							name='street'
							placeholder='Ulica'
							aria-label='Ulica'
							type='text'
						/>
						<InputFormik
							name='date'
							placeholder='Data'
							aria-label='Data'
							type='date'
						/>
						<InputFormik
							name='time'
							placeholder='Godzina'
							aria-label='Godzina'
							type='time'
						/>
						<InputFormikFile
							name='fileImg'
							aria-label='Zdjęcie'
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
						/>
						<ButtonMain type='submit' variant={"btnSkewRight"}>
							Utwórz wydarzenie
						</ButtonMain>
					</Form>
				)}
			</Formik>
		</FormContainerBlur>
	);
};

export default FormikEvent;
