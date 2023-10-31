"use client";
import ModalRoot from "./ModalRoot";
import ModalDelete from "@/components/Tools/DeleteModal";
import { loading } from "@/global/notification-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormikEvent from "../Forms/FormikEvent/FormikEvent";
import FormikAccount from "../Forms/FormAccount/FormikAccount";

const ModalHandlerServer = ({ lang, trl_err, dict }) => {
	const isVisible = useSelector(state => state.modal.isVisibleRoot);
	const dispatch = useDispatch();
	const { modalDeleteEvent, modalEditEvent, modalSettings } = dict;

	// const [animation, setAnimation] = useState(false);

	useEffect(() => {
		if (!isVisible) {
			dispatch(loading(false));
		}
	}, [isVisible]);

	// useEffect(() => {
	// 	if (isVisible) {
	// 		setTimeout(() => {
	// 			setAnimation(true);
	// 		}, 100);
	// 	}
	// });

	return (
		<>
			{isVisible && (
				<ModalRoot>
					{isVisible === "settingsModal" && (
						<FormikAccount dict={modalSettings} lang={lang} />
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
