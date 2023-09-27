"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	isAlready: false,
	result: false,

	message: "",
	variant: "",
};

const notification = createSlice({
	name: "notification",
	initialState: initialState,
	reducers: {
		reset: () => {
			return initialState;
		},
		showResult: (state, action) => {
			state.result = true;
			state.message = action.payload.message;
			state.variant = action.payload.variant;
		},
		toggleLoading: state => {
			state.isLoading = !state.isLoading;
		},
	},
});

export const { reset, showResult, toggleLoading, toggleResult } =
	notification.actions;
export default notification.reducer;
