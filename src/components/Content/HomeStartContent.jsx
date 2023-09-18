import styles from "../../styles/components/Content/HomeStartContent.module.scss";
import ButtonMain from "../transitions/Button/ButtonMain";

const HomeStartContent = () => {
	return (
		<section className={styles.introduction}>
			<div className={styles["introduction__text"]}>
				<h1 className={styles["introduction__h1"]}>Tylko dobry rap</h1>
				<p className={styles["introduction__text"]}>
					O każdej porze dnia, <br />
					rapuje ile tylko sie da!
				</p>
				<ButtonMain
					variant='btnSkewRight'
					className={styles["introduction__btn"]}>
					Rejestracja
				</ButtonMain>
				<ButtonMain
					variant='btnSkewRight'
					className={`${styles["introduction__btn"]} ${styles["introduction__btn--right"]}`}>
					Współpraca
				</ButtonMain>
			</div>
		</section>
	);
};

export default HomeStartContent;
