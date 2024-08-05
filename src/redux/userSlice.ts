import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
	name: "",
    middleName: "",
    lastName: "",
    email: "",
    token: "",
    type: 1
};

export const userSlice : any = createSlice({
	name: "user",
	initialState,
	reducers: {
        setUser: (state, action) => {
            const { name, middleName, lastName, email, type, id } = action.payload;

            state.name = name;
            state.middleName = middleName;
            state.lastName = lastName;
            state.email = email;
            state.type = type;
            state.id = id;
        },

        logout: () => initialState,
        setToken: (state, action) => {
            const { token } = action.payload;
            state.token = token
        }

    },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;