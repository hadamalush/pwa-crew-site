"use client";
import WrapperStart from "../transitions/Wrappers/WrapperStart";
import LinkAsBtn from "../transitions/Link/LinkAsBtn";
import styles from "../../styles/components/Content/HomeStartContent.module.scss";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomeStartContent = ({
	title,
	text,
	btn_registration,
	btn_events,
	btn_cooperation,
	className,
	...props
}) => {
	const { data: session, status } = useSession();
	const params = useSearchParams();
	const isLoginLink = !session ? "/registration" : "/events";
	const isLoginLinkNameBtn = !session ? btn_registration : btn_events;
	const classes = `${styles.introduction} ${className || ""}`;
	const refresh = params.get("refresh");
	const router = useRouter();

	useEffect(() => {
		if (refresh === "true") {
			router.refresh();
		}
	}, [refresh]);

	console.log(session);

	return (
		<WrapperStart className={classes}>
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
