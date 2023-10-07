"use client";
import WrapperStart from "../transitions/Wrappers/WrapperStart";
import LinkAsBtn from "../transitions/Link/LinkAsBtn";
import styles from "../../styles/components/Content/HomeStartContent.module.scss";
import { useSession } from "next-auth/react";

const HomeStartContent = ({ title, text }) => {
	const { data: session, status } = useSession();
	const isLoginLink = !session ? "rejestracja" : "wydarzenia";

	return (
		<WrapperStart className={styles.introduction}>
			<div className={styles["introduction__text"]}>
				<h1 className={styles["introduction__h1"]}>{title}</h1>
				<p className={styles["introduction__text"]}>{text}</p>
				<LinkAsBtn href={`/${isLoginLink}`}>{isLoginLink}</LinkAsBtn>
				<LinkAsBtn href='/wydarzenia'>Współpraca</LinkAsBtn>
			</div>
		</WrapperStart>
	);
};

export default HomeStartContent;
