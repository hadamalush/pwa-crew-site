"use client";
import Link from "next/link";
import styles from "../../../styles/components/transitions/Logo/Logo.module.scss";
import IconRender from "@/components/Icons/IconRender";

const Logo = props => {
	const classes = `${styles["logo"]} ${props.className}`;

	return (
		<Link href='/' className={classes}>
			<IconRender variant='logo' className={styles["logo__icon"]} />
			<h2 className={styles["logo__text"]}>
				Pwa
				<span className={styles["logo__text--awarded"]}>Crew</span>
			</h2>
		</Link>
	);
};

export default Logo;
