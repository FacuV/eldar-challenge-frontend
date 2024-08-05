import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    title: "",
    body: ""
};

export const postSlice : any = createSlice({
	name: "post",
	initialState,
	reducers: {
        setPost: (state, action) => {
            const { id, title, body } = action.payload;

            state.id = id;
            state.title = title;
            state.body = body
        }

    },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;