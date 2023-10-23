"use client";
import styles from "../../../styles/components/transitions/Buttons/ButtonMain.module.scss";
import { useState } from "react";

/** 
 @description This component is a skewed button with inside border. When clicked, an animation will be loaded.
 @param {String} children Enter children as string.
 @param {String} className - Enter className as string.
 @param {Boolean} animation Enter true when you want to start animation. Animation will start only if button clicked and animation true.
 @param {Function} onClick Enter function.
 @returns {JSX.Element} Returns button.
**/

const ButtonMain = ({
	className,
	children,
	disabled,
	animation,
	onClick,
	...props
}) => {
	const [isAnimation, setIsAnimation] = useState(false);

	const classesBtnAnimation =
		isAnimation && !animation
			? `${styles.button} ${styles["button__transparent"]}`
			: styles.button;
	const classesBtn = `${classesBtnAnimation} ${className || ""} `;

	const classesSpan =
		isAnimation && !animation
			? `${styles["button__border"]} ${styles["rotating-border"]}`
			: styles["button__border"];

	const animationHandler = () => {
		setIsAnimation(true);
	};

	return (
		<button
			disabled={disabled}
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
