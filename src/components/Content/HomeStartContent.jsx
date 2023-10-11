"use client";
import WrapperStart from "../transitions/Wrappers/WrapperStart";
import LinkAsBtn from "../transitions/Link/LinkAsBtn";
import styles from "../../styles/components/Content/HomeStartContent.module.scss";
import { useSession } from "next-auth/react";

const HomeStartContent = ({
	title,
	text,
	btn_registration,
	btn_events,
	btn_cooperation,
	lang,
}) => {
	const { data: session, status } = useSession();

	const isLoginLink = !session ? "/registration" : "/events";

	const isLoginLinkNameBtn = !session ? btn_registration : btn_events;

	return (
		<WrapperStart className={styles.introduction}>
			<div className={styles["introduction__text"]}>
				<h1 className={styles["introduction__h1"]}>{title}</h1>
				<p className={styles["introduction__text"]}>{text}</p>
				<LinkAsBtn href={`${isLoginLink}`}>{isLoginLinkNameBtn}</LinkAsBtn>
				<LinkAsBtn href='/contact'>{btn_cooperation}</LinkAsBtn>
			</div>
		</WrapperStart>
	);
};

export default HomeStartContent;
