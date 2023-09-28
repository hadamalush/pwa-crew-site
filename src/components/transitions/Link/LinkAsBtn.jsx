import Link from "next/link";
import styles from "../../../styles/components/transitions/Link/LinkAsButton.module.scss";

const LinkAsBtn = ({ href, children, className, variant, ...props }) => {
	const classes = variant
		? `${styles.link} ${className} ${styles[variant]}`
		: `${styles.link} ${className} `;

	return (
		<Link href={href} className={classes}>
			{children}
		</Link>
	);
};

export default LinkAsBtn;
