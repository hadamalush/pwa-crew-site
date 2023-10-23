"use client";
import ImgBgBlur from "../Image/ImgBgBlur";
import IconRender from "@/components/Icons/IconRender";
import styles from "../../../styles/components/transitions/Modal/Modal.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ModalParallel = React.memo(
	({ className, searchParams, children, lang }) => {
		const [visible, setVisible] = useState(null);
		const router = useRouter();
		const param = searchParams?.modal;

		const classesBg = visible
			? `${styles.bg} ${styles["bg__visibility"]}`
			: `${styles.bg}`;
		const classes = visible
			? `${styles.modal} ${styles.modal__visibility} ${className || ""}`
			: `${styles.modal} ${className || ""}`;

		useEffect(() => {
			if (param === "true") {
				const timer = setTimeout(() => {
					setVisible(true);
					clearTimeout(timer);
				}, 100);

				const styleBody = document.createElement("style");
				styleBody.innerHTML = "body { overflow: hidden; }";
				document.head.appendChild(styleBody);
			}
			if (param === "false") {
				closeModalHandler();
			}
		}, [param]);

		const closeModalHandler = useCallback(event => {
			setVisible(false);
			const styleBody = document.createElement("style");
			styleBody.innerHTML = "body { overflow: visible; overflow-x: hidden }";
			document.head.appendChild(styleBody);

			const timer = setTimeout(() => {
				router.back();
				clearTimeout(timer);
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
	}
);

export default ModalParallel;
