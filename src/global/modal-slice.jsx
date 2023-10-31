import { createSlice } from "@reduxjs/toolkit";

const initialStateModal = {
	dataModal: null,
	dataRootModal: null,
	params: null,
	isVisible: false,
	isVisibleRoot: false,
	isHideRoot: false,
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
			state.isHideRoot = false;
		},
		setIsHideRoot: (state, action) => {
			state.isHideRoot = action.payload.isHideRoot;
		},
		setParams: (state, action) => {
			state.params = action.payload.params;
		},
	},
});

export const closeModalWithAnimation = dispatch => {
	dispatch(setIsHideRoot({ isHideRoot: true }));
	setTimeout(() => dispatch(setIsVisibleRoot({ isVisibleRoot: false })), 200);
};

export const {
	setDataModal,
	setIsVisible,
	setDataRootModal,
	setIsVisibleRoot,
	setIsHideRoot,
	setParams,
} = modal.actions;
export default modal.reducer;
