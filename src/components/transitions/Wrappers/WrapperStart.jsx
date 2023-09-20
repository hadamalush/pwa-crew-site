import styles from "../../../styles/components/transitions/Wrappers/WrapperStart.module.scss";

/**
 *
 * @param {className} className You can only set className as props and forwards children beetwen tags.
 * @returns Returns section. This component should be use as first component in section main.'
 */
const WrapperStart = ({ className, ...props }) => {
	const classes = `${styles.start} ${className}`;
	return <section className={classes}>{props.children}</section>;
};

export default WrapperStart;
