"use client";
import IconRender from "@/components/Icons/IconRender";
import WrapperInput from "../Wrappers/WrapperInput";
import styles from "../../../styles/components/transitions/Inputs/TextareaFormik.module.scss";
import { Field, useField } from "formik";

const TextareaFormik = ({ name, onChange, setFieldValue, ...props }) => {
	const [field, meta] = useField(name);

	return (
		<>
			<WrapperInput className={styles["input-box"]}>
				<Field
					name={name}
					{...props}
					className={styles.input}
					component='textarea'
					autoComplete='off'
				/>
				{meta.error && meta.touched && (
					<>
						<p className={styles["input-box__error"]}>{meta?.error}</p>
					</>
				)}
				{!meta.error && meta.touched && (
					<>
						<p className={styles["input-box__correct"]}>Poprawnie.</p>
					</>
				)}
			</WrapperInput>
		</>
	);
};

export default TextareaFormik;
