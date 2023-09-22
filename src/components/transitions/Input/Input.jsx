import styles from "../../../styles/components/transitions/Inputs/Input.module.scss";

const Input = props => {
	const classes = `${styles.input} ${props.className}`;
	return (
		<input
			id={props.id}
			className={classes}
			onChange={props.onChange}
			ref={props.reference}
			type={props.type}
			name={props.name}
			placeholder={props.placeholder}
			autoComplete={props.autoComplete}
			aria-label={props.arialabel}
		/>
	);
};

export default Input;
