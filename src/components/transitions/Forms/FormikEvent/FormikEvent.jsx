"use client";
import FormContainerBlur from "@/components/Containers/FormContainerBlur";
import InputFormik from "../../Input/InputFormik";
import InputFormikFile from "../../Input/InputFormikFile";
import ButtonMain from "../../Button/ButtonMain";
import TextareaFormik from "../../Input/TextareaFormik";
import styles from "../../../../styles/components/transitions/Forms/FormikEvent.module.scss";
import { Formik, Form } from "formik";
import { eventSchema } from "@/components/Schemas/FormSchem";
import { useDispatch } from "react-redux";
import { showResult } from "@/global/notification-slice";
import { generalConfig } from "@/config/gerenalConfig";

/**
 * @description This component returns form for create new event.
 * @returns Reuturns the whole form component. Should be wrapped with WrapperFormWithContent. However if you want you can pass this component withoud that wrapper.
 */

const FormikEvent = () => {
	const dispatch = useDispatch(showResult);

	const addEventhandler = async values => {
		const file = values.fileImg;
		const uploadStorage = generalConfig.uploadImageStorageEvent;

		let imgSrcVercelBlob;
		let imgSrcMega;
		let imgSrcLocal;

		// UPLOAD FILE LOCAL DIRECTORY

		// try {
		// 	const response = await fetch(`/api/upload/local?filename=${file.name}`, {
		// 		method: "POST",
		// 		body: file,
		// 	});

		// 	const data = await response.json();

		// 	console.log(data);

		// 	if (response.ok) {
		// 		imgSrcLocal = data.message;
		// 	}
		// } catch (error) {
		// 	//wstawic powiadomienie o bledzie
		// 	console.log(error);
		// }

		// UPLOAD FILE MEGA DIRECTORY

		if (uploadStorage === "mega" || uploadStorage === "all") {
			try {
				const response = await fetch(`/api/upload/mega?filename=${file.name}`, {
					method: "POST",
					body: file,
				});
				const data = await response.json();

				if (data.message) {
					imgSrcMega = data.message;
				}
			} catch (error) {
				console.log(error);
			}
		}

		// // UPLOAD FILE TO VERCEL BLOB

		if (uploadStorage === "vercelBlob" || uploadStorage === "all") {
			try {
				const response = await fetch(
					`/api/upload/vercelBlob?filename=${file.name}`,
					{
						method: "POST",
						body: file,
					}
				);

				if (response.ok) {
					const data = await response.json();
					imgSrcVercelBlob = data.url;
				}

				if (!response.ok && !imgSrcMega) {
					dispatch(
						showResult({
							message: "Nie udało się utworzyć wydarzenia ,spróbuj ponownie.",
							variant: "warning",
						})
					);
					return;
				}
			} catch (error) {
				if (!imgSrcMega) {
					dispatch(
						showResult({
							message: "Nie udało się utworzyć wydarzenia ,spróbuj ponownie.",
							variant: "warning",
						})
					);
					return;
				}
			}
		}

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
					description: values.description,
					imageSrcVercelBlob: imgSrcVercelBlob,
					imageSrcMega: imgSrcMega,
					// imageSrcLocal: imgSrcLocal,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				dispatch(showResult({ message: data.error, variant: "warning" }));
				return;
			}
			dispatch(showResult({ message: data.message, variant: "success" }));
			return;
		} catch (error) {
			dispatch(
				showResult({
					message: "Nie udało się utworzyć wydarzenia",
					variant: "warning",
				})
			);
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
					description: "",
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

						<TextareaFormik
							name='description'
							aria-label='Opis wydarzenia'
							placeholder='Opis wydarzenia'
							type='textarea'
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
