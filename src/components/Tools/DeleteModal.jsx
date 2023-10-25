"use client";

import ButtonMain from "../transitions/Button/ButtonMain";
import Heading from "../transitions/Elements/Heading";
import styles from "../../styles/components/transitions/Modal/ModalDelete.module.scss";
import { useDispatch } from "react-redux";
import { loading, showResult } from "@/global/notification-slice";
import { setIsVisible } from "@/global/modal-slice";

const ModalDelete = ({ className, lang, dict, searchParams, hSize }) => {
	const dispatch = useDispatch();

	const itemId = searchParams?.event;
	const { trl_title, trl_btn_delete, trl_btn_cancel, trl_err } = dict;

	const actionHandler = async cancel => {
		dispatch(loading(true));
		let data;

		if (!cancel) {
			try {
				const response = await fetch(
					`/api/deleteEvent?title=${searchParams?.title}`,
					{
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ id: itemId, lang }),
					}
				);

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

			dispatch(setIsVisible({ isVisible: "close" }));

			return;
		}

		dispatch(setIsVisible({ isVisible: "close-no-refresh" }));
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
