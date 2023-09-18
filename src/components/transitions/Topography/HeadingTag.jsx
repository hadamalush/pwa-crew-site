"use client";
import styles from "../../../styles/components/transitions/Topography/HeadingTag.module.scss";

const HeadingTag = ({ type, size, className, ...props }) => {
	const headingMapping = {
		h1: { 1: "3.2rem", 2: "3.6rem", 3: "4rem" },
		h2: { 1: "2.4rem", 2: "3.6rem", 3: "4rem" },
		h3: { 1: "2.4rem", 2: "3.6rem", 3: "4rem" },
		h4: { 1: "1.6rem", 2: "2rem", 3: "2.4rem" },
	};

	const style = { fontSize: headingMapping[type][size] };
	const classes = `${styles.heading} ${className}`;

	const HeadingTag = type;

	return (
		<HeadingTag style={style} type={type} size={size} className={classes}>
			{props.children}
		</HeadingTag>
	);
};

export default HeadingTag;
