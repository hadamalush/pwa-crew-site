import styles from "../../../styles/components/transitions/Wrappers/WrapperInput.module.scss";

/**
 *
 * @returns Returns div. This is a box for inputs and icons. Horizontal set.
 */

const WrapperInput = ({ className, ...props }) => {
	const classes = `${styles.wrapper} ${className}`;
	return <div className={classes}>{props.children}</div>;
};

export default WrapperInput;
