"use client";
import IconRender from "@/components/Icons/IconRender";
import WrapperInput from "../Wrappers/WrapperInput";
import styles from "../../../styles/components/transitions/Inputs/InputFormik.module.scss";
import { useField } from "formik";
import { eventSchema } from "@/components/Schemas/FormSchem";

const InputFormikFile = ({
	name,
	onChange,
	setFieldValue,
	setFieldTouched,
	...props
}) => {
	const [field, meta] = useField(name);

	const iconStyle = { color: "green" };

	const validate = async event => {
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
					name={name}
					{...props}
					className={styles.input}
					autoComplete='off'
					onChange={validate}
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
