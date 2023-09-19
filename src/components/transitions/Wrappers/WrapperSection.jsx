import styles from "../../../styles/components/transitions/Wrappers/WrapperSection.module.scss";

const WrapperSection = ({ id, className, ...props }) => {
	const classes = `${styles.section} ${className}`;
	return (
		<section id={id} className={classes}>
			{props.children}
		</section>
	);
};

export default WrapperSection;
