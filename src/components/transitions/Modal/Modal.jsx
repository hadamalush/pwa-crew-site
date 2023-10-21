"use client";
import ImgBgBlur from "../Image/ImgBgBlur";
import styles from "../../../styles/components/transitions/Modal/Modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsShow, setModalComponent } from "@/global/modal-slice";
import IconRender from "@/components/Icons/IconRender";

const Modal = ({ className, lang }) => {
	const component = useSelector(state => state.modal.modalComponent);
	const isShowModal = useSelector(state => state.modal.isShow);
	const dispatch = useDispatch();

	console.log(isShowModal);

	const classesBg = isShowModal
		? `${styles.bg} ${styles["bg__visibility"]}`
		: `${styles.bg}`;
	const classes = isShowModal
		? `${styles.modal} ${styles.modal__visibility} ${className || ""}`
		: `${styles.modal} ${className || ""}`;

	useEffect(() => {
		if (component) {
			const style = document.createElement("style");
			style.innerHTML = "body { overflow: hidden; }";
			document.head.appendChild(style);
		}
	}, [component]);

	const closeModalHandler = () => {
		dispatch(setIsShow({ isShow: false }));

		setTimeout(() => {
			dispatch(setModalComponent({ modalComponent: null }));
		}, 500);
	};

	return (
		<div className={classesBg}>
			<div className={classes}>
				<IconRender
					variant='cross'
					onClick={closeModalHandler}
					className={styles["modal__exit"]}
				/>
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
