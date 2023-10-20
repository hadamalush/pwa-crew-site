"use client";
import FormikEvent from "../Forms/FormikEvent/FormikEvent";
import ImgBgBlur from "../Image/ImgBgBlur";
import styles from "../../../styles/components/transitions/Modal/Modal.module.scss";

const Modal = ({ className, lang }) => {
	const classes = `${styles.modal} ${className || ""}`;

	const dict = {
		trl_title: "title",
		trl_eventTitle: "dasdkoaskdok",
		trl_town: "Town",
		trl_codePost: "77777",
		trl_street: "Street",
		trl_eventDesc: "Description",
		trl_date: "Date",
		trl_picture: "Picture",
		trl_createEvent: "Create Event",
		trl_startTime: "Start event",
	};

	return (
		<div className={classes}>
			<ImgBgBlur
				src={"/images/background/background-events.webp"}
				className={styles["modal__imgBlur"]}
			/>
			<div className={styles["modal__content"]}>
				<FormikEvent
					dict={dict}
					lang={lang}
					className={styles["modal__form"]}
				/>
			</div>
		</div>
	);
};

export default Modal;
