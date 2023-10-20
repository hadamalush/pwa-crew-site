import { createSlice } from "@reduxjs/toolkit";

const initialStateModal = {
	isShow: true,
	modalComponent: null,
};

const modal = createSlice({
	name: "modal",
	initialState: initialStateModal,
	reducers: {
		setModalComponent: (state, action) => {
			state.modalComponent = action.payload.modalComponent;
		},
		setIsShow: (state, action) => {
			state.isShow = action.payload.isShow;
		},
	},
});

export const { setModalComponent, setIsShow } = modal.actions;
export default modal.reducer;
