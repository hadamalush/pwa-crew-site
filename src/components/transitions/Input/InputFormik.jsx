"use client";
import IconRender from "@/components/Icons/IconRender";
import styles from "../../../styles/components/transitions/Inputs/InputFormik.module.scss";

import { Field, useField } from "formik";

import WrapperInput from "../Wrappers/WrapperInput";

const InputFormik = ({ name, ...props }) => {
	const [field, meta] = useField(name);
	const iconStyle = { color: "green" };

	return (
		<>
			<WrapperInput className={styles["input-box"]}>
				<IconRender variant={name} />
				<Field
					name={name}
					{...props}
					className={styles.input}
					autoComplete='off'
				/>
				{meta.error && meta.touched && (
					<>
						<p className={styles["input-box__error"]}>{meta?.error}</p>
					</>
				)}
				<IconRender
					// style={!meta.error && iconStyle}
					className={
						!meta.error
							? styles["input-box__icon--valid"]
							: styles["input-box__icon--invalid"]
					}
					variant={
						(meta.error && meta.touched && "warning") ||
						(!meta.error && meta.touched && "good")
					}
				/>
			</WrapperInput>
		</>
	);
};

export default InputFormik;
