import styles from "../../styles/components/Content/HomeStartContent.module.scss";
import ButtonMain from "../transitions/Button/ButtonMain";
import ImageLoader from "../transitions/Image/ImageLoader";

const HomeStartContent = () => {
	return (
		<section className={styles.introduction}>
			<h1 className={styles["introduction__h1"]}>Tylko dobry rap</h1>
			<p className={styles["introduction__text"]}>Nieliczni z nielicznych</p>
			<ButtonMain variant='default' className={styles["introduction__btn"]}>
				Dołącz do nas
			</ButtonMain>
			<ImageLoader src='/images/mainContent/rap.png' alt='Raperzy z płytą' />
		</section>
	);
};

export default HomeStartContent;
