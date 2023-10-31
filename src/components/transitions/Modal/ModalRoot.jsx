"use client";
import IconRender from "@/components/Icons/IconRender";
import ImgBgBlur from "../Image/ImgBgBlur";
import styles from "../../../styles/components/transitions/Modal/ModalRoot.module.scss";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setIsVisibleRoot } from "@/global/modal-slice";
import { handleScroll } from "@/lib/helper";

const ModalRoot = ({ children }) => {
	const dispatch = useDispatch();
	const [isHide, setIsHide] = useState(false);

	useEffect(() => {
		if (isHide) {
			handleScroll("visible");
		} else {
			handleScroll("hidden");
		}
	}, [isHide]);

	const classesBg = isHide ? `${styles.bg} ${styles.bg__hidden}` : styles.bg;

	const closeModalHandler = () => {
		setIsHide(true);
		setTimeout(() => dispatch(setIsVisibleRoot(false)), 200);
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
