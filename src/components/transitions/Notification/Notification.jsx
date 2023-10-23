"use client";
import styles from "../../../styles/components/transitions/Notification/Notification.module.scss";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/global/notification-slice";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Notification = () => {
	const message = useSelector(state => state.notification.message);
	const result = useSelector(state => state.notification.result);
	const variant = useSelector(state => state.notification.variant);
	const dispatch = useDispatch(reset);

	useEffect(() => {
		if (result && variant === "success") {
			toast.success(message, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			setTimeout(() => {
				dispatch(reset());
			}, 5000);
		}

		if (result && variant === "warning") {
			toast.error(message, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			setTimeout(() => {
				dispatch(reset());
			}, 5000);
		}
	}, [result]);

	return (
		<ToastContainer
			position='top-center'
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme='dark'
			className={styles.notification}
		/>
	);
};

export default Notification;
