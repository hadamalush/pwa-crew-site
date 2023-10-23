import { createSlice } from "@reduxjs/toolkit";

const initialStateModal = {
	isVisible: false,
	dataModal: null,
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
	},
});

export const { setDataModal, setIsVisible } = modal.actions;
export default modal.reducer;
