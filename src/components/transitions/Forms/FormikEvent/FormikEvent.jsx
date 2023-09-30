"use client";
import InputFormik from "../../Input/InputFormik";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import styles from "../../../../styles/components/transitions/Forms/FormikEvent.module.scss";
import { Formik, Form } from "formik";

const FormikEvent = () => {
	return (
		<FormContainerBlur>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				// onSubmit={onSubmit}
				// validationSchema={loginSchema}
				className={styles.form}>
				{props => (
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
							placeholder='Miasto'
							aria-label='Miasto'
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
						<InputFormik
							name='fileImg'
							placeholder='Zdjęcie'
							aria-label='Zdjęcie'
							type='file'
						/>
					</Form>
				)}
			</Formik>
		</FormContainerBlur>
	);
};

export default FormikEvent;
