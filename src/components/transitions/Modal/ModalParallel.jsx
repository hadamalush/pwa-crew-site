"use client";
import ImgBgBlur from "../Image/ImgBgBlur";
import IconRender from "@/components/Icons/IconRender";
import styles from "../../../styles/components/transitions/Modal/Modal.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setDataModal, setIsVisible } from "@/global/modal-slice";

const ModalParallel = React.memo(({ className, children, lang }) => {
	const isVisible = useSelector(state => state.modal.isVisible);
	const dispatch = useDispatch();
	const router = useRouter();

	const classesBg = isVisible
		? `${styles.bg} ${styles["bg__visibility"]}`
		: `${styles.bg}`;
	const classes = isVisible
		? `${styles.modal} ${styles.modal__visibility} ${className || ""}`
		: `${styles.modal} ${className || ""}`;

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(setIsVisible({ isVisible: true }));
			clearTimeout(timer);
		}, 100);

		const styleBody = document.createElement("style");
		styleBody.innerHTML = "body { overflow: hidden; }";
		document.head.appendChild(styleBody);
	}, []);

	useEffect(() => {
		if (isVisible === "close") {
			closeModalHandler();
		}
	}, [isVisible]);

	const closeModalHandler = useCallback(event => {
		dispatch(setIsVisible({ isVisible: false }));
		const styleBody = document.createElement("style");
		styleBody.innerHTML = "body { overflow: visible; overflow-x: hidden }";
		document.head.appendChild(styleBody);

		const timer = setTimeout(() => {
			dispatch(setDataModal({ dataModal: null }));
			clearTimeout(timer);
			router.back();
		}, 500);
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
});

export default ModalParallel;
