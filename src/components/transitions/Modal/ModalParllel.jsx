"use client";
import ImgBgBlur from "../Image/ImgBgBlur";
import IconRender from "@/components/Icons/IconRender";
import styles from "../../../styles/components/transitions/Modal/Modal.module.scss";
import { useEffect, useState } from "react";

const ModalParallel = ({ className, isVisible, children, onClose, lang }) => {
	const [visible, setVisible] = useState();

	const classesBg = visible
		? `${styles.bg} ${styles["bg__visibility"]}`
		: `${styles.bg}`;
	const classes = visible
		? `${styles.modal} ${styles.modal__visibility} ${className || ""}`
		: `${styles.modal} ${className || ""}`;

	useEffect(() => {
		if (isVisible) {
			const animate = setTimeout(() => setVisible(true), 100);
			const styleBody = document.createElement("style");
			styleBody.innerHTML = "body { overflow: hidden; }";
			document.head.appendChild(styleBody);
		}
	}, [isVisible]);

	const closeModalHandler = event => {
		setVisible(false);
		const styleBody = document.createElement("style");
		styleBody.innerHTML = "body { overflow: visible; overflow-x: hidden }";
		document.head.appendChild(styleBody);
		setTimeout(() => onClose(), 500);
	};

	const modalClickHandler = event => {
		event.stopPropagation();
	};

	return (
		<div className={classesBg} onClick={closeModalHandler}>
			<div className={classes} onClick={modalClickHandler} id='modal'>
				<IconRender variant='cross' />
				<ImgBgBlur
					src={"/images/background/background-events.webp"}
					className={styles["modal__imgBlur"]}
				/>
				<div className={styles["modal__content"]}>{children}</div>
			</div>
		</div>
	);
};

export default ModalParallel;
