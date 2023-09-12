"use client";
import styles from "../../../styles/components/transitions/Tooltips/TooltipMenuItems.module.scss";

const TooltipMenuItems = props => {
	const classes = `${styles.tooltip} ${props.className}`;

	return <ul className={classes}>{props.children}</ul>;
};

export default TooltipMenuItems;
