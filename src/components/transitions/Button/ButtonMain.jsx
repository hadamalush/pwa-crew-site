"use client";
import { usePathname } from "next/navigation";
import styles from "../../../styles/components/transitions/Buttons/ButtonMain.module.scss";
import { useState, useEffect } from "react";

/** 
@param variant - default, borderIn, btnSkewRight
**/

const ButtonMain = ({ className, variant, children, ...props }) => {
	const [isAnimation, setIsAnimation] = useState(false);

	const classesBtn = isAnimation
		? `${styles.button} ${styles["button__transparent"]}`
		: styles.button;

	const classesSpan = isAnimation
		? `${styles["button__border"]} ${styles["rotating-border"]}`
		: styles["button__border"];

	const animationHandler = () => {
		props.onClick;
		setIsAnimation(true);
	};

	return (
		<button
			className={classesBtn}
			onClick={animationHandler}
			type={props.type}
			placeholder={props.placeholder}>
			{children}
			<span className={classesSpan}>{children}</span>
		</button>
	);
};

export default ButtonMain;
