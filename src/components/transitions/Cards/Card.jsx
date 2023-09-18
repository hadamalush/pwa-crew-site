import styles from "../../../styles/components/transitions/Cards/Card.module.scss";
import cardVariant from "../../../styles/components/transitions/Cards/CardsVariants.module.scss";

const Card = ({ icon, title, children, ...props }) => {
	const variant = props.variant;

	const classes = `${styles.card} ${cardVariant[`${variant}`]} ${
		props.className
	}`;

	return (
		<div className={classes}>
			{icon}
			<h4 className={styles["card__title"]}>{title}</h4>
			<p className={styles["card__text"]}>{children}</p>
		</div>
	);
};

export default Card;
