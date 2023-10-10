"use client";
import IconRender from "@/components/Icons/IconRender";
import WrapperInput from "../Wrappers/WrapperInput";
import styles from "../../../styles/components/transitions/Inputs/InputFormik.module.scss";
import { useField } from "formik";
import { eventSchema } from "@/components/Schemas/FormSchem";

/**
 * @description This component is input type file ,exactly for image type PNG,JPEG,WEBP,JPG and allow size maximum 4MB . There is connected with eventSchema(fileImg).
 * @param {String} name Pass name of type string.
 * @param {Function} setFieldValue Pass function from formik props.
 * @param {Function} setFieldTouched Pass function from formik props.
 * @returns Return input.
 */

const InputFormikFile = ({
	name,
	setFieldValue,
	setFieldTouched,
	...props
}) => {
	const [field, meta] = useField(name);
	const iconStyle = { color: "green" };

	const validationFileHandler = async event => {
		setFieldValue("fileImg", event.target.files[0]);

		try {
			await eventSchema.validateAt(name, {
				fileImg: event.target.files[0],
			});
		} catch (error) {
			console.log(error);
		}
		setFieldTouched("fileImg", true);
	};

	return (
		<>
			<WrapperInput className={styles["input-box"]}>
				<IconRender variant={name} />
				<input
					id={name}
					name={name}
					type='file'
					className={styles.input}
					autoComplete='off'
					onChange={validationFileHandler}
					{...props}
					capture='camera'
				/>
				{meta.error && meta.touched && (
					<>
						<p className={styles["input-box__error"]}>{meta?.error}</p>
					</>
				)}
				<IconRender
					style={!meta.error && iconStyle}
					variant={
						(meta.error && meta.touched && "warning") ||
						(!meta.error && meta.touched && "good")
					}
				/>
			</WrapperInput>
		</>
	);
};

export default InputFormikFile;
