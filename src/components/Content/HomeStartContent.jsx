"use client";
import WrapperStart from "../transitions/Wrappers/WrapperStart";
import ButtonMain from "../transitions/Button/ButtonMain";
import Link from "next/link";
import styles from "../../styles/components/Content/HomeStartContent.module.scss";
import { useSession } from "next-auth/react";

const HomeStartContent = () => {
	const { data: session, status } = useSession();

	return (
		<WrapperStart className={styles.introduction}>
			<div className={styles["introduction__text"]}>
				<h1 className={styles["introduction__h1"]}>Tylko dobry rap</h1>
				<p className={styles["introduction__text"]}>
					O każdej porze dnia, <br />
					rapuje ile tylko sie da!
				</p>
				{!session && (
					<Link
						href='/rejestracja'
						className={`${styles["introduction__btn"]} ${styles["introduction__btn--right"]} ${styles["btnSkewRight"]}`}>
						Rejestracja{" "}
					</Link>
				)}
				<ButtonMain
					variant='btnSkewRight'
					className={`${styles["introduction__btn"]} ${styles["introduction__btn--right"]}`}>
					Współpraca
				</ButtonMain>
			</div>
		</WrapperStart>
	);
};

export default HomeStartContent;
