"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
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
			state.message = action.payload.message;
			state.variant = action.payload.variant;
			state.result = true;
		},
		toggleLoading: state => {
			state.isLoading = !state.isLoading;
		},
	},
});

export const { reset, showResult, toggleLoading } = notification.actions;
export default notification.reducer;
