import Link from "next/link";
import styles from "../../../styles/components/transitions/Logo/Logo.module.scss";
import IconRender from "@/components/Icons/IconRender";

const Logo = props => {
	const logoSize = { width: props.size + "rem" };
	const textSize = { fontSize: props.size + "rem" };
	const classes = `${styles["logo"]} ${props.className}`;

	return (
		<Link href='/' className={classes}>
			<IconRender
				variant='logo'
				className={styles["logo__icon"]}
				style={logoSize}
			/>
			<h2 className={styles["logo__text"]} style={textSize}>
				Pwa
				<span className={styles["logo__text--awarded"]}>crew</span>
			</h2>
		</Link>
	);
};

export default Logo;
