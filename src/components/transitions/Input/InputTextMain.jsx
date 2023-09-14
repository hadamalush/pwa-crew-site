import styles from "../../../styles/components/transitions/Inputs/InputTextMain.module.scss";

const InputTextMain = props => {
	const classes = `${styles.input} ${props.className}`;
	return (
		<input
			id={props.id}
			className={classes}
			onChange={props.onChange}
			type={props.type}
			name={props.name}
			placeholder={props.placeholder}
		/>
	);
};

export default InputTextMain;
