"use client";

import styles from "../../../styles/components/transitions/Inputs/CheckboxFormik.module.scss";
import { Field, useField } from "formik";
import WrapperInput from "../Wrappers/WrapperInput";

const CheckboxFormik = ({ label, name, ...props }) => {
	const [field, meta] = useField(name);

	return (
		<>
			<WrapperInput className={styles["input-box"]}>
				<Field name={name} {...props} />
				<label>{label}</label>
				{meta.error && meta.touched && (
					<>
						<p className={styles["input-box__error"]}>{meta?.error}</p>
					</>
				)}
			</WrapperInput>
		</>
	);
};

export default CheckboxFormik;
