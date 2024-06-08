import { createSlice } from "@reduxjs/toolkit"

export const reduxInitialStatePlaying = {
    trackId: "",
    tags: []
}
    
const playingSlice = createSlice({
    name: "playing",
    initialState: reduxInitialStatePlaying,
    reducers: {
        playingUpdate: (state, action) => {
            state.trackId = action.payload.trackId
            state.tags = action.payload.tags
        }
    }
})

export const { playingUpdate } = playingSlice.actions
export default playingSlice.reducer