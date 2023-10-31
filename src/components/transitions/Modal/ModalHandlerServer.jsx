"use client";
import ModalRoot from "./ModalRoot";
import ModalDelete from "@/components/Tools/DeleteModal";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ModalHandlerServer = ({ lang }) => {
	const isVisible = useSelector(state => state.modal.isVisibleRoot);
	// const [animation, setAnimation] = useState(false);

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
					<ModalDelete lang={lang} dict={translation} hSize='h2' />
				</ModalRoot>
			)}
		</>
	);
};

export default ModalHandlerServer;
