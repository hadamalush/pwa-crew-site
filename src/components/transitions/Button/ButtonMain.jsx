import styles from "../../../styles/components/transitions/Buttons/ButtonMain.module.scss";
import btnVariant from "../../../styles/components/transitions/Buttons/ButtonVariants.module.scss";
/** 
@param variant - default, borderIn, btnSkewRight
**/

const ButtonMain = ({ className, variant, ...props }) => {
	const classes = `${styles.button} ${btnVariant[`${variant}`]} ${
		className || ""
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
