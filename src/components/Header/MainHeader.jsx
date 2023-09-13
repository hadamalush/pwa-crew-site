"use client";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import Image from "next/image";
import IconRender from "../Icons/IconRender";
import Link from "next/link";

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
				<Link href='/' className={styles["header__logo"]}>
					<IconRender variant='logo' className={styles["header__logo-icon"]} />
					<h2 className={styles["header__logo-text"]}>
						Pwa
						<span className={styles["header__logo-text--awarded"]}>crew</span>
					</h2>
				</Link>
				<ul className={styles["header__nav"]}>
					<li className={styles["header__nav-item"]}>
						<Link href='/' className={styles["header__nav-link"]}>
							Home
						</Link>
					</li>
					<li className={styles["header__nav-item"]}>
						<Link href='/' className={styles["header__nav-link"]}>
							O nas
						</Link>
					</li>
					<li className={styles["header__nav-item"]}>
						<Link href='/' className={styles["header__nav-link"]}>
							Sklep
						</Link>
					</li>
					<li className={styles["header__nav-item"]}>
						<Link href='/' className={styles["header__nav-link"]}>
							Kontakt
						</Link>
					</li>
				</ul>
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
