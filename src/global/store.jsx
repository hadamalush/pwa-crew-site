import sessionReducer from "./session-slice";
import notificationReducer from "./notification-slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const isClient = typeof window !== "undefined";

const noopStorage = {
	getItem: () => Promise.resolve(null),
	setItem: () => Promise.resolve(null),
	removeItem: () => Promise.resolve(null),
};

let storage;
if (isClient) {
	storage = createWebStorage("local");
} else {
	storage = noopStorage;
}

const persistConfig = {
	key: "session",
	version: 1,
	storage: storage,
};
const rootReducer = combineReducers({
	session: persistReducer(persistConfig, sessionReducer),
	notification: persistReducer(persistConfig, notificationReducer),
});

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }),
	devTools: true,
});

export default store;
