"use client";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import Logo from "../transitions/Logo/Logo";
import NavbarTop from "../Navigation/NavbarTop";
import NewsletterForm from "../transitions/Forms/Newsletter/NewsletterForm";
import NavbarMobile from "../Navigation/NavbarMobile";
import { useMediaQuery } from "react-responsive";

const MainHeader = props => {
	const isLarge = useMediaQuery({ query: "(min-width: 992px)" });

	const logoSize = !isLarge ? 5 : 7;

	return (
		<header className={styles.header}>
			<Logo size={logoSize} className={styles["header__logo"]} />
			<NavbarTop className={styles["header__nav"]} />
			{props.newsletter && (
				<NewsletterForm className={styles["header__newsletter"]} />
			)}
			<NavbarMobile />
		</header>
	);
};

export default MainHeader;
