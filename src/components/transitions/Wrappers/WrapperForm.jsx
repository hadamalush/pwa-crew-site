import styles from "../../../styles/components/transitions/Wrappers/WrapperForm.module.scss";

const WrapperForm = ({ className, ...props }) => {
	const classes = `${styles["form-container"]} ${className}`;
	return (
		<div id='logowanie' className={classes}>
			{props.children}
		</div>
	);
};

export default WrapperForm;
