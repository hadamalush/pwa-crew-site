"use client";
import WrapperStart from "../transitions/Wrappers/WrapperStart";
import styles from "../../styles/components/Content/HomeStartContent.module.scss";
import { useSession } from "next-auth/react";
import LinkAsBtn from "../transitions/Link/LinkAsBtn";

const HomeStartContent = () => {
	const { data: session, status } = useSession();
	const isLoginLink = !session ? "rejestracja" : "wydarzenia";

	return (
		<WrapperStart className={styles.introduction}>
			<div className={styles["introduction__text"]}>
				<h1 className={styles["introduction__h1"]}>Tylko dobry rap</h1>
				<p className={styles["introduction__text"]}>
					O każdej porze dnia, <br />
					rapuje ile tylko sie da!
				</p>
				<LinkAsBtn href={`/${isLoginLink}`}>{isLoginLink}</LinkAsBtn>
				<LinkAsBtn href='/wydarzenia'>Współpraca</LinkAsBtn>
			</div>
		</WrapperStart>
	);
};

export default HomeStartContent;
