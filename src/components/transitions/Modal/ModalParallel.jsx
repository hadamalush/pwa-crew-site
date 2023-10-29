"use client";
import ImgBgBlur from "../Image/ImgBgBlur";
import IconRender from "@/components/Icons/IconRender";
import styles from "../../../styles/components/transitions/Modal/Modal.module.scss";
import React, { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setDataModal, setIsVisible } from "@/global/modal-slice";
import { handleScroll } from "@/lib/helper";

/**
 * @description This component should be used in the parallel routes modal. Modal will show after change route. If you want to close modal from another part of aplication you should set dispatch(setIsVisible({ isVisible: "close" })). Default closing is when you click behind the modal or if you click the cross.
 * @param {String} className Enter className as string.
 * @param {JSX.Element} children Enter jsx element as children.
 * @returns {JSX.Element} Returns the whole modal with animations.
 */

const ModalParallel = React.memo(
	({ className, children, path, small, lang }) => {
		const pathname = usePathname();

		if (!pathname.includes(path) && path) {
			handleScroll("visible");
			return null;
		}

		const isVisible = useSelector(state => state.modal.isVisible);
		const dispatch = useDispatch();
		const router = useRouter();

		const classesBg = isVisible
			? `${styles.bg} ${styles["bg__visibility"]}`
			: `${styles.bg}`;
		const classes = isVisible
			? `${styles.modal} ${styles.modal__visibility} ${
					small && styles.modal__small
			  } ${className || ""}`
			: `${styles.modal} ${className || ""}`;

		useEffect(() => {
			const timer = setTimeout(() => {
				dispatch(setIsVisible({ isVisible: true }));
				clearTimeout(timer);
			}, 100);

			handleScroll("hidden");
		}, []);

		useEffect(() => {
			if (
				isVisible === "close" ||
				isVisible === "close-no-refresh" ||
				isVisible === "close-hard"
			) {
				closeModalHandler();
			}
		}, [isVisible]);

		const closeModalHandler = useCallback(event => {
			const refresh = isVisible === "close";
			const noRefresh = isVisible === "close-no-refresh";
			const closeHard = isVisible === "close-hard";
			dispatch(setIsVisible({ isVisible: false }));
			handleScroll("visible");

			if (closeHard) return;

			const timer = setTimeout(() => {
				dispatch(setDataModal({ dataModal: null }));
				clearTimeout(timer);

				router.back();
				refresh && router.refresh();
			}, 300);
		});

		const modalClickHandler = event => {
			event.stopPropagation();
		};

		return (
			<div className={classesBg} onClick={closeModalHandler}>
				<div className={classes} onClick={modalClickHandler} id='modal'>
					<IconRender
						variant='cross'
						className={styles["modal__quit"]}
						onClick={closeModalHandler}
					/>
					<ImgBgBlur
						src={"/images/background/background-events.webp"}
						className={styles["modal__imgBlur"]}
					/>
					<div className={styles["modal__content"]}>{children}</div>
				</div>
			</div>
		);
	}
);

export default ModalParallel;
