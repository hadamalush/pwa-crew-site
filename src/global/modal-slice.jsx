import { createSlice } from "@reduxjs/toolkit";

const initialStateModal = {
	isVisible: false,
	dataModal: null,
	isVisibleRoot: false,
	dataRootModal: null,
};

const modal = createSlice({
	name: "modal",
	initialState: initialStateModal,
	reducers: {
		setDataModal: (state, action) => {
			state.dataModal = action.payload.dataModal;
		},
		setIsVisible: (state, action) => {
			state.isVisible = action.payload.isVisible;
		},

		setDataRootModal: (state, action) => {
			state.dataRootModal = action.payload.dataRootModal;
		},
		setIsVisibleRoot: (state, action) => {
			state.isVisibleRoot = action.payload.isVisibleRoot;
		},
	},
});

export const {
	setDataModal,
	setIsVisible,
	setDataRootModal,
	setIsVisibleRoot,
} = modal.actions;
export default modal.reducer;
