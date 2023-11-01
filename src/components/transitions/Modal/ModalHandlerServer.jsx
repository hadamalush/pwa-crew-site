"use client";
import dynamic from "next/dynamic";
import { loading } from "@/global/notification-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataRootModal } from "@/global/modal-slice";

const FormikAccount = dynamic(() =>
	import("../Forms/FormAccount/FormikAccount")
);

const NotificationList = dynamic(() =>
	import("../Notification/NotificationList")
);
const FormikEvent = dynamic(() => import("../Forms/FormikEvent/FormikEvent"));
const ModalDelete = dynamic(() => import("../../Tools/DeleteModal"));
const ModalRoot = dynamic(() => import("../../transitions/Modal/ModalRoot"));

const ModalHandlerServer = ({ lang, trl_err, dict }) => {
	const isVisible = useSelector(state => state.modal.isVisibleRoot);
	const dispatch = useDispatch();
	const { modalDeleteEvent, modalEditEvent, modalSettings } = dict;

	useEffect(() => {
		if (!isVisible) {
			dispatch(loading(false));
			dispatch(setDataRootModal({ dataRootModal: null }));
		}
	}, [isVisible]);

	return (
		<>
			{isVisible && (
				<ModalRoot lang={lang}>
					{isVisible === "settingsModal" && (
						<FormikAccount dict={modalSettings} lang={lang} />
					)}
					{isVisible === "notificationsModal" && (
						<NotificationList lang={lang} />
					)}
					{isVisible === "eventDeleteModal" && (
						<ModalDelete lang={lang} dict={modalDeleteEvent} hSize='h2' />
					)}
					{isVisible === "eventEditModal" && (
						<FormikEvent
							dict={modalEditEvent}
							trl_error={trl_err}
							lang={lang}
							variant='edit'
							scroll='block'
							style={{ width: "100%" }}
						/>
					)}
				</ModalRoot>
			)}
		</>
	);
};

export default ModalHandlerServer;
