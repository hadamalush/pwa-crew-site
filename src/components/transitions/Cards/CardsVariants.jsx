import styles from "../../../styles/components/transitions/Buttons/ButtonMain.module.scss";
import btnVariant from "../../../styles/components/transitions/Buttons/ButtonVariants.module.scss";

const CardVariant = props => {
	//variants: default,
	const variant = props.variant;

	const classes = `${styles.button} ${btnVariant[`${variant}`]} ${
		props.className
	}`;
	return (
		<button
			className={classes}
			onClick={props.onClick}
			type={props.type}
			placeholder={props.placeholder}>
			{props.children}
		</button>
	);
};

export default ButtonMain;
