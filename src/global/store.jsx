import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./session-slice";
import { persistReducer } from "redux-persist";
import logger from "redux-logger";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

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
	storage: storage,
};
const rootReducer = combineReducers({
	session: persistReducer(persistConfig, sessionReducer),
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
