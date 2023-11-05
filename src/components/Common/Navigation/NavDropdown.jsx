import Link from "next/link";
import styles from "../../../styles/components/Navigation/NavDropdown.module.scss";

/**
 * @description This component is for dropdown menu. You can enter array with objects as much as you want.
 * @param {Array} dropdownItems Enter array with objects, object should contains (title, href and if you want onClick). For example: exampleArray: [{title: 'Events', href:'/events', onClick: exampleFunctionHandler}]
 * @returns {JSX.Element} This components returns the whole dropdown menu.
 */

const NavDropdown = ({ dropdownItems, className, ...props }) => {
  const classes = `${styles.dropdown} ${className || ""}`;

  let i = 0;
  return (
    <ul className={classes}>
      {dropdownItems.map((item) => {
        const href = item.href === "/events/new-event" ? item.href + "#form" : item.href;

        i++;
        return (
          <li key={i}>
            <Link
              href={href}
              scroll={item.href === "/events/new-event#form" ? true : false}
              onClick={item.onClick || ""}
              className={styles["dropdown__item"]}
            >
              {item.title}
            </Link>
            {item?.notices && item?.notices !== "0" && (
              <span className={styles.dropdown__notices}>
                {item.notices.length >= 3 ? "99+" : item.notices}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavDropdown;
