"use client";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import Image from "next/image";
import IconRender from "../Icons/IconRender";
import Link from "next/link";
import Logo from "../transitions/Logo/Logo";
import NavbarTop from "../Navigation/NavbarTop";

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
			<div className={styles["header__top"]}>
				<Logo size='5' className={styles.icon} />
				<NavbarTop />

			</div>
			<form className={styles["header__newsletter"]}>
				<div className={styles["header__newsletter-box"]}>
					<div className={styles["header__newsletter-box1"]}>
						<label htmlFor='newsletter'>
							<h3>Newsletter</h3>
							<p>Bądź na bieżąco</p>
						</label>
						<input type='text' name='newsletter' id='newsletter' />
						<button>Subskrybuj</button>
					</div>
				</div>
			</form>

			{props.children}
		</header>
	);
};

export default MainHeader;
