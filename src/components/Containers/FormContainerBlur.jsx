import styles from "../../styles/components/Containers/FormContainerBlur.module.scss";

/**
 * @description It is container which should be connect with WrapperFormWithConntent ,this component is a child of that component.
 * @param {String} id Pass id as string
 * @param {String} className Pass className as string
 * @param {JSX.Element} children  Pass form and some elements ,like heading, inputs, buttons etc.
 * @returns This component returns div.
 */

const FormContainerBlur = ({ id, className, children, ...props }) => {
	const classes = `${styles.container} ${className || ""}`;
	return (
		<div className={classes} id={id}>
			{children}
		</div>
	);
};

export default FormContainerBlur;
