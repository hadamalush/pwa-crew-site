import Logo2 from "../Logo/Logo";
import SocialMedia from "../SocialMedia/SocialMedia";
import React from "react";
import Image from "next/image";
import styles from "../../../styles/components/transitions/Wrappers/WrapperFormWithContent.module.scss";

/**
 * @description This component should be connect with FormContainer, this component is a parent of that component.
 * @param {String} headingType   Should have one of that parameters h1,h2,h3,h4,h5,h6
 * @param {String} title It should be text of type string
 * @param {String} textFirst It should be string and should have maximum 20characters
 * @param {String} textSecond It should be string and should have maximum 30characters
 * @param {String} className You can add additional classes and and overwrite styles this wrapper.
 * @param {JSX.Element} children Beetween tags you should pass form.
 *
 * @returns {JSX.Element} This component will return div
 */

const WrapperFormWithContent = ({
	headingType,
	title,
	textFirst,
	textSecond,
	imageSrc,
	className,
	children,
	alt,
	...props
}) => {
	const HeadingCustom = headingType;
	const classes = `${styles.container} ${className}`;

	return (
		<div className={classes}>
			<Image
				priority={true}
				src={imageSrc}
				alt={alt}
				fill
				className={styles["container__img"]}
				sizes={"(max-width: 768px) 10vw, (min-width: 768px) 70vw"}
			/>
			<div className={styles["container__content"]}>
				<Logo2 />
				<div className={styles["container__content-text"]}>
					<HeadingCustom className={styles["container__content-heading"]}>
						{title}
						<br />
						<span> {textFirst} </span>
					</HeadingCustom>
					<p>{textSecond}</p>
					<SocialMedia />
				</div>
			</div>
			{children}
		</div>
	);
};

export default WrapperFormWithContent;
