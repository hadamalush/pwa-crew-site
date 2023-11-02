"use client";
import Link from "next/link";
import ImageFill from "../../transitions/Image/ImageFill";
import IconRender from "../../transitions/Icons/IconRender";
import styles from "../../../styles/components/Navigation/NavOptions.module.scss";
import { useDispatch } from "react-redux";
import { loading } from "@/global/notification-slice";
import { usePathname } from "next/navigation";

/**
 * @description This component is for navigation options. Maximum 4 elements.
 * @param {String} className Enter className as string.
 * @param {String} imgSrc Enter image source as string.
 * @param {Boolean} animationQuit Enter varible with boolean. When true then animation close will start.
 * @param {Array} options Enter array with objects. Object should includes title, href, imgSrc and optional onClick properties. For example: [{title: 'Events', href: '/events', imgSrc: "/images/options/option-events.webp", onClick: signOut}] Those properties are type string.
 * @param {Function} onClickCross Enter function which remove NavOptions from structure.
 * @returns {JSX.Element} Return the whole component with options menu. Prefer mobile devices.
 */

const NavOptions = ({ className, animationQuit, options, onClickCross }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const quantityOptions = options.length;
  const classesGeneral = `${styles.menu} ${className || ""}`;
  let i = 0;

  const closeMenuHandler = (loadingAnimation, path, onClick) => {
    if (loadingAnimation && !pathname.includes(path)) dispatch(loading(true));

    const items = document.querySelectorAll(`.${styles["menu__item"]}`);
    const itemExit = document.querySelector(`.${styles["menu__cutout"]}`);
    const menu = document.querySelector(`.${styles.menu}`);
    menu.classList.add(styles["menu-hide"]);
    itemExit.classList.add(styles["menu__cutout--inVisible"]);
    items.forEach((item) => item.classList.add(styles["menu__item--reverse"]));

    setTimeout(() => {
      onClickCross(), onClick && onClick();
    }, 600);
  };

  if (animationQuit) {
    closeMenuHandler();
  }

  return (
    <ul className={classesGeneral}>
      {options.map((item) => {
        const wordsQuantity = item.title.split(" ").length;

        const classItem =
          quantityOptions === 2
            ? `${styles["menu__item"]} ${styles["menu__item--second"]}`
            : styles["menu__item"];

        const classesParagraph =
          wordsQuantity > 1
            ? `${styles["menu__item-title"]} ${styles["menu__item-title--bottom"]}`
            : styles["menu__item-title"];
        i++;

        return (
          <li key={i} className={classItem}>
            <Link
              href={item.href}
              className={styles["menu__item-link"]}
              onClick={(e) => closeMenuHandler(true, item.href, item.onClick && item.onClick(e))}
            ></Link>
            <ImageFill
              src={item.imgSrc}
              className={styles["menu__item-hexagon"]}
              alt={item.title}
              sizes="(min-width: 250px) 20vw"
            />
            <p className={classesParagraph}>{item.title}</p>
          </li>
        );
      })}
      <IconRender
        variant="cross"
        onClick={() => closeMenuHandler(false)}
        className={
          quantityOptions === 4
            ? `${styles["menu__cutout"]} ${styles["menu__cutout--second"]}`
            : styles["menu__cutout"]
        }
      />
    </ul>
  );
};

export default NavOptions;
