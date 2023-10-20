"use client";
import ImgBgBlur from "../Image/ImgBgBlur";
import styles from "../../../styles/components/transitions/Modal/Modal.module.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Modal = ({ className, lang }) => {
	const component = useSelector(state => state.modal.modalComponent);

	const classesBg = component
		? `${styles.bg} ${styles["bg__visibility"]}`
		: `${styles.bg}`;
	const classes = component
		? `${styles.modal} ${styles.modal__visibility} ${className || ""}`
		: `${styles.modal} ${className || ""}`;
	const isShow = useSelector(state => state.modal.isShow);

	useEffect(() => {
		if (component) {
			const style = document.createElement("style");
			style.innerHTML = "body { overflow: hidden; }";
			document.head.appendChild(style);
		}
	}, [component]);

	return (
		<div className={classesBg}>
			<div className={classes}>
				<ImgBgBlur
					src={"/images/background/background-events.webp"}
					className={styles["modal__imgBlur"]}
				/>
				<div className={styles["modal__content"]}>{component}</div>
			</div>
		</div>
	);
};

export default Modal;
