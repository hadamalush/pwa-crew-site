"use client";
import WrapperStart from "../transitions/Wrappers/WrapperStart";
import LinkAsBtn from "../transitions/Link/LinkAsBtn";
import styles from "../../styles/components/Content/HomeStartContent.module.scss";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomeStartContent = ({
	title,
	text,
	btn_registration,
	btn_events,
	btn_cooperation,
	className,
	lang,
	...props
}) => {
	const { data: session, status } = useSession();
	const params = useSearchParams();
	const pathname = usePathname();
	const isHomePage = pathname === "/en" || pathname === "/pl";

	const isLoginLink = !session ? "/registration" : "/events";
	const isLoginLinkNameBtn = !session ? btn_registration : btn_events;
	const classes = `${styles.introduction} ${className || ""}`;
	const refresh = params.get("refresh");
	const router = useRouter();
	const classesTitle = `${styles["introduction__h1"]} ${
		isHomePage &&
		(lang === "pl"
			? styles["introduction__h1--pl"]
			: styles["introduction__h1--en"])
	}`;

	useEffect(() => {
		if (refresh === "true") {
			router.refresh();
		}
	}, [refresh]);

	return (
		<WrapperStart className={classes}>
			<div className={styles["introduction__text"]}>
				<div className={isHomePage ? styles["introduction__loader"] : ""}>
					<h1 className={classesTitle}>{title}</h1>
				</div>
				<p className={styles["introduction__text"]}>{text}</p>
				<LinkAsBtn href={`${isLoginLink}`}>{isLoginLinkNameBtn}</LinkAsBtn>
				<LinkAsBtn href='/contact'>{btn_cooperation}</LinkAsBtn>
			</div>
		</WrapperStart>
	);
};

export default HomeStartContent;
