"use client";
import styles from "../../styles/components/Navigation/NavItemDesktop.module.scss";
import Link from "next/link";
import IconRender from "../Icons/IconRender";

const NavItemDesktop = props => {
	const classes = `${styles["nav__item"]} ${props.className}`;
	const linkClasses = `${styles["nav__link"]} ${props.classNameLink} `;

	return (
		<li className={classes}>
			<Link href={props.href} className={linkClasses}>
				<IconRender variant={props.iconVariant} />
			</Link>
			{props.children}
		</li>
	);
};

export default NavItemDesktop;
