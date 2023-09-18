import styles from "../../../styles/components/transitions/Cards/Cards.module.scss";

const Cards = props => {
	const classes = `${styles.cards} ${props.className}`;
	return <section className={classes}>{props.children}</section>;
};

export default Cards;
