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
			>
				{props => (
					<Form>
						<h1>Logowanie</h1>
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
							name='date'
							placeholder='Data'
							aria-label='Data'
							type='file'
						/>
					</Form>
				)}
			</Formik>
		</FormContainerBlur>
	);
};

export default FormikEvent;
