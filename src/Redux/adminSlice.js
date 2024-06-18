import { createSlice } from "@reduxjs/toolkit";

export const reduxInitialStateAdmin = {
    id: "",
    name: "",
    username: "",
    email: "",
    picture: ""
}

const adminSlice = createSlice({
    name: "admin",
    initialState: reduxInitialStateAdmin,
    reducers: {
        updateAdmin: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.username = action.payload.username
            state.email = action.payload.email
            state.picture = action.payload.picture
        }
    }
})

export const { updateAdmin } = adminSlice.actions
export default adminSlice.reducer