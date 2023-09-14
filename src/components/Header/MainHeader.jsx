"use client";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import Image from "next/image";
import Logo from "../transitions/Logo/Logo";
import NavbarTop from "../Navigation/NavbarTop";
import WrapperMain from "../transitions/Wrappers/WrapperMain";
import NewsletterForm from "../transitions/Forms/Newsletter/NewsletterForm";

const MainHeader = props => {
	return (
		<header className={styles.header}>
			<Image
				alt='dasd'
				src='/images/header/header-img.jpg'
				width={0}
				height={0}
				fill
				sizes='100vw'
				className={styles["header__image"]}
			/>
			<WrapperMain>
				<div className={styles["header__top"]}>
					<div className={styles["header__box"]}>
						<Logo size='5' className={styles["header__logo"]} />
						<NavbarTop className={styles["header__nav"]} />
					</div>
					{props.newsletter && (
						<div className={styles["header__newsletter-box"]}>
							<NewsletterForm className={styles["header__newsletter"]} />
						</div>
					)}
				</div>
			</WrapperMain>

			{props.children}
		</header>
	);
};

export default MainHeader;
