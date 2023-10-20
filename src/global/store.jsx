import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notification-slice";
import modalReducer from "./modal-slice";

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		modal: modalReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
