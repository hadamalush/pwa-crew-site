import { createSlice } from "@reduxjs/toolkit";

const initialStateModal = {
	isVisible: true,
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
			state.isShow = action.payload.isShow;
		},
	},
});

export const { setDataModal, setIsVisible } = modal.actions;
export default modal.reducer;
