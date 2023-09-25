"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	result: true,
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
		showPending: () => {
			state.isLoading = true;
		},
	},
});

export const { reset, showResult, showPending } = notification.actions;
export default notification.reducer;
