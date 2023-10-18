"use client";
import Link from "next/link";
import styles from "../../../styles/components/transitions/Link/LinkAsButton.module.scss";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { loading } from "@/global/notification-slice";

const LinkAsBtn = ({ href, children, className, variant, ...props }) => {
	const [isAnimation, setIsAnimation] = useState(false);

	const pathname = usePathname();
	const dispatch = useDispatch();

	useEffect(() => {
		setIsAnimation(false);
	}, [pathname]);

	const classesLink = isAnimation
		? `${styles.link} ${styles["link__transparent"]}`
		: styles.link;

	const classes = variant
		? `${styles.link} ${className} ${styles[variant]}`
		: `${classesLink}  ${className} `;

	const classesSpan = isAnimation
		? `${styles["link__border"]} ${styles["rotating-border"]}`
		: styles["link__border"];

	const animationHandler = e => {
		dispatch(loading(true));
		setIsAnimation(true);
	};

	return (
		<Link href={href} className={classes} onClick={animationHandler}>
			{children}
			<span className={classesSpan}>{children}</span>
		</Link>
	);
};

export default LinkAsBtn;
