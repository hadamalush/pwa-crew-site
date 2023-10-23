"use client";
import Link from "next/link";
import styles from "../../../styles/components/transitions/Link/LinkAsButton.module.scss";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "@/global/notification-slice";

const LinkAsBtn = ({
	href,
	scroll,
	children,
	className,
	variant,
	prefetch,
	onClick,
	...props
}) => {
	const [isAnimation, setIsAnimation] = useState(false);

	const data = useSelector(state => state.modal.dataModal);

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

		if (onClick) {
			onClick();
		}
	};

	return (
		<Link
			href={href}
			scroll={scroll}
			className={classes}
			prefetch={prefetch}
			onClick={animationHandler}>
			{children}
			<span className={classesSpan}>{children}</span>
		</Link>
	);
};

export default LinkAsBtn;
