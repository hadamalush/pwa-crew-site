import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notification-slice";

const isClient = typeof window !== "undefined";

// const noopStorage = {
// 	getItem: () => Promise.resolve(null),
// 	setItem: () => Promise.resolve(null),
// 	removeItem: () => Promise.resolve(null),
// };

// let storage;
// if (isClient) {
// 	storage = createWebStorage("local");
// } else {
// 	storage = noopStorage;
// }

// const persistConfig = {
// 	key: "session",
// 	version: 1,
// 	storage: storage,
// };
const store = configureStore({
	reducer: {
		notification: notificationReducer,
	},
});

export default store;
