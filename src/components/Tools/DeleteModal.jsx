"use client";

import ButtonMain from "../transitions/Button/ButtonMain";
import Heading from "../transitions/Elements/Heading";

import styles from "../../styles/components/transitions/Modal/ModalDelete.module.scss";
import { useDispatch } from "react-redux";
import { loading, showResult } from "@/global/notification-slice";

const ModalDelete = ({
	className,
	lang,
	dict,
	searchParams,
	hSize,
	children,
}) => {
	const dispatch = useDispatch();
	const itemId = searchParams?.event;

	const { trl_title, trl_btn_delete, trl_btn_cancel, trl_err } = dict;

	const deleteItemHandler = async () => {
		dispatch(loading(true));

		try {
			const response = await fetch("/api/deleteEvent", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: itemId, lang }),
			});

			const data = await response.json();

			console.log(data);
		} catch (err) {
			dispatch(loading(false));
			dispatch(
				showResult({
					message: trl_err,
					variant: "warning",
				})
			);
		}
	};

	return (
		<div className={`${styles.modal} ${className || ""}`}>
			<Heading as={hSize} className={styles["modal__heading"]}>
				{trl_title}
			</Heading>

			<ButtonMain>{trl_btn_cancel}</ButtonMain>
			<ButtonMain onClick={deleteItemHandler}>{trl_btn_delete}</ButtonMain>
		</div>
	);
};

export default ModalDelete;
