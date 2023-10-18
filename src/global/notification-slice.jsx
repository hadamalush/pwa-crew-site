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
		loading: (state, action) => {
			state.isLoading = !!action.payload;
		},
	},
});

export const { reset, showResult, loading } = notification.actions;
export default notification.reducer;
