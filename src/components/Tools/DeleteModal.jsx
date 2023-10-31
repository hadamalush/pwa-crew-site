"use client";

import ButtonMain from "../transitions/Button/ButtonMain";
import Heading from "../transitions/Elements/Heading";
import styles from "../../styles/components/transitions/Modal/ModalDelete.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loading, showResult } from "@/global/notification-slice";
import { closeModalWithAnimation } from "@/global/modal-slice";
import { getCookie, setCookie } from "@/lib/cookies";

const ModalDelete = ({ className, lang, dict, hSize }) => {
	const dispatch = useDispatch();
	const params = useSelector(state => state.modal.params);

	const itemId = params?.id;
	const { trl_title, trl_btn_delete, trl_btn_cancel, trl_err } = dict;

	const actionHandler = async cancel => {
		if (cancel) {
			closeModalWithAnimation(dispatch);
			return;
		}

		dispatch(loading(true));
		let data;

		try {
			const response = await fetch(`/api/deleteEvent?title=${params?.title}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: itemId, lang }),
			});

			data = await response.json();

			if (!response.ok) {
				dispatch(loading(false));
				dispatch(showResult({ message: data.error, variant: "warning" }));
				return;
			}
		} catch (err) {
			dispatch(loading(false));
			dispatch(
				showResult({
					message: trl_err,
					variant: "warning",
				})
			);
		}

		dispatch(
			showResult({
				message: data.message,
				variant: "success",
			})
		);

		const receivedNotices = await getCookie("newNotices");

		if (receivedNotices) {
			const quantityNotices = parseInt(receivedNotices?.value);

			await setCookie("newNotices", quantityNotices + 1);
		}

		closeModalWithAnimation(dispatch);
	};

	return (
		<div className={`${styles.modal} ${className || ""}`}>
			<Heading as={hSize} className={styles["modal__heading"]}>
				{trl_title}
			</Heading>

			<ButtonMain onClick={() => actionHandler(true)}>
				{trl_btn_cancel}
			</ButtonMain>
			<ButtonMain onClick={() => actionHandler(false)}>
				{trl_btn_delete}
			</ButtonMain>
		</div>
	);
};

export default ModalDelete;
