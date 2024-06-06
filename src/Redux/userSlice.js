import { createSlice } from "@reduxjs/toolkit"

export const reduxInitialStateUser = {
    id: "",
    name: "",
    username: "",
    email: "",
    picture: "",
    account_type: ""
}
    
const userSlice = createSlice({
    name: "users",
    initialState: reduxInitialStateUser,
    reducers: {
        updateUser: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.username = action.payload.username
            state.email = action.payload.email
            state.picture = action.payload.picture
            state.account_type = action.payload.account_type
        }
    }
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer