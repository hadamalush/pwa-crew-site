"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuth: false,
	email: "",
	uid: null,
};

const session = createSlice({
	name: "session",
	initialState: initialState,
	reducers: {
		logOut: () => {
			return initialState;
		},
		logIn: (state, action) => {
			state.isAuth = action.payload.auth;
			state.email = action.payload.email;
		},
	},
});

export const { logIn, logOut } = session.actions; //sessionActions dispatch
export default session.reducer; // sessionReducer useSelector
