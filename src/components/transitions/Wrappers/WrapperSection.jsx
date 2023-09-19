import styles from "../../../styles/components/transitions/Wrappers/WrapperSection.module.scss";

const WrapperSection = ({ className, ...props }) => {
	const classes = `${styles.section} ${className}`;
	return <section className={classes}>{props.children}</section>;
};

export default WrapperSection;
