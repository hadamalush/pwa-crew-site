"use client";
import styles from "../../styles/components/Header/MainHeader.module.scss";
import Image from "next/image";

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
				className={styles["header-image"]}
			/>

			{props.children}
		</header>
	);
};

export default MainHeader;
