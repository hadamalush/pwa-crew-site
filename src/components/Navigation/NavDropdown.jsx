import Link from "next/link";
import styles from "../../styles/components/Navigation/NavDropdown.module.scss";

/**
 * @description This component is for dropdown menu. You can enter array with objects as much as you want.
 * @param {Array} dropdownItems Enter array with objects, object should contains (title, href and if you want onClick). For example: exampleArray: [{title: 'Events', href:'/events', onClick: exampleFunctionHandler}]
 * @returns {JSX.Element} This components returns the whole dropdown menu.
 */

const NavDropdown = ({ dropdownItems, className, ...props }) => {
	const classes = `${styles.dropdown} ${className || ""}`;
	return (
		<ul className={classes}>
			{dropdownItems.map(item => {
				return (
					<li>
						<Link
							href={item.href}
							onClick={item.onClick || ""}
							className={styles["dropdown__item"]}>
							{item.title}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default NavDropdown;
