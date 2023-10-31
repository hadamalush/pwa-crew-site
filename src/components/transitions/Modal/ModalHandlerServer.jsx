"use client";
import ModalRoot from "./ModalRoot";
import ModalDelete from "@/components/Tools/DeleteModal";
import { loading } from "@/global/notification-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalHandlerServer = ({ lang, dict }) => {
	const isVisible = useSelector(state => state.modal.isVisibleRoot);
	const dispatch = useDispatch();

	// const [animation, setAnimation] = useState(false);

	useEffect(() => {
		if (!isVisible) {
			dispatch(loading(false));
		}
	}, [isVisible]);

	const translation = {
		trl_title: "czy chcesz na pewno usunac? ",
		trl_btn_delete: "delete",
		trl_btn_cancel: "cancel",
		trl_err: " error jakis tam",
	};

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
					<ModalDelete lang={lang} dict={dict} hSize='h2' />
				</ModalRoot>
			)}
		</>
	);
};

export default ModalHandlerServer;
