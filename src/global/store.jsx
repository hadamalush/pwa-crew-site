import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notification-slice";

const store = configureStore({
	reducer: {
		notification: notificationReducer,
	},
});

export default store;
