import styles from "../../styles/components/Content/HomeStartContent.module.scss";
import Image from "next/image";
import ButtonMain from "../transitions/Button/ButtonMain";

const HomeStartContent = () => {
	return (
		<section className={styles.introduction}>
			<h1 className={styles.h1}>Tylko dobry rap</h1>
			<p>Nieliczni z nielicznych</p>
			<ButtonMain variant='default' className={styles.btn}>
				Dołącz do nas
			</ButtonMain>
			<div className={styles.img1}>
				<Image
					priority
					src='/images/mainContent/rap.png'
					alt='siemano'
					fill
					className={styles.img}
				/>
			</div>
		</section>
	);
};

export default HomeStartContent;
