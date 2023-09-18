import styles from "../../../styles/components/transitions/Cards/Card.module.scss";
import cardVariant from "../../../styles/components/transitions/Cards/CardsVariants.module.scss";

const Card = ({ children, className, ...props }) => {
	const variant = props.variant;
	const classes = `${styles.card} ${cardVariant[`${variant}`]} ${className}`;

	return <div className={classes}>{children}</div>;
};

export default Card;
