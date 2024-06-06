import { createSlice } from "@reduxjs/toolkit"

export const reduxInitialStatePlaying = {
    trackId: ""
}
    
const playingSlice = createSlice({
    name: "playing",
    initialState: reduxInitialStatePlaying,
    reducers: {
        playingUpdate: (state, action) => {
            state.trackId = action.payload.trackId
        }
    }
})

export const { playingUpdate } = playingSlice.actions
export default playingSlice.reducer