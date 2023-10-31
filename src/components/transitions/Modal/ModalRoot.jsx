"use client";
import IconRender from "@/components/Icons/IconRender";
import ImgBgBlur from "../Image/ImgBgBlur";
import styles from "../../../styles/components/transitions/Modal/ModalRoot.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { closeModalWithAnimation } from "@/global/modal-slice";
import { handleScroll } from "@/lib/helper";

const ModalRoot = ({ children }) => {
	const dispatch = useDispatch();
	const isHide = useSelector(state => state.modal.isHideRoot);

	useEffect(() => {
		if (isHide) {
			handleScroll("visible");
		} else {
			handleScroll("hidden");
		}
	}, [isHide]);

	const classesBg = isHide ? `${styles.bg} ${styles.bg__hidden}` : styles.bg;

	const closeModalHandler = () => {
		closeModalWithAnimation(dispatch);
	};

	const modalClickHandler = event => {
		event.stopPropagation();
	};

	return (
		<div className={classesBg} onClick={closeModalHandler}>
			<div className={styles.modal} id='modal' onClick={modalClickHandler}>
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
};

export default ModalRoot;
