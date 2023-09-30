"use client";
import InputFormik from "../../Input/InputFormik";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import styles from "../../../../styles/components/transitions/Forms/FormikEvent.module.scss";
import ButtonMain from "../../Button/ButtonMain";
import { Formik, Form } from "formik";
import { eventSchema } from "@/components/Schemas/FormSchem";
import { useState } from "react";
import InputFormikFile from "../../Input/InputFormikFile";

const FormikEvent = () => {
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
				// onSubmit={onSubmit}
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
							placeholder='Zdjęcie'
							aria-label='Zdjęcie'
							type='file'
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
