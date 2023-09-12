"use client";
import styles from "../../../styles/components/transitions/Tooltips/TooltipMenuItem.module.scss";
import Link from "next/link";

const TooltipMenuItem = props => {
	const classes = `${styles["tooltip-item"]} ${props.className}`;

	return (
		<li className={classes}>
			<Link href={props.href}>{props.children}</Link>
		</li>
	);
};

export default TooltipMenuItem;
