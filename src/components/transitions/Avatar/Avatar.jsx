import Image from "next/image";
import styles from "../../../styles/components/transitions/Avatar/Avatar.module.scss";
import { useSession } from "next-auth/react";

/**
 *
 * @param {String} className You can enter className as String.
 * @param {JSX.Element} children You can enter dropdown menu as children - not required.
 * @returns {JSX.Element} Returns profile picture.
 */
const Avatar = ({ className, children, ...props }) => {
	const classes = `${styles.avatar} ${className || ""}`;
	const { data: session } = useSession();

	const sessionAvatar = session?.user?.image;
	const imageAvatar = sessionAvatar
		? sessionAvatar
		: "/images/profil/anonymous.jpg";

	return (
		<div className={classes}>
			<Image
				src={imageAvatar}
				height={50}
				width={50}
				alt='Zdjęcie profilowe'
				className={styles["avatar__img"]}
			/>
			{children}
		</div>
	);
};

export default Avatar;
