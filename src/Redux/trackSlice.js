import { createSlice } from "@reduxjs/toolkit"

export const reduxInitialStateTrack = {
    track: {}
}
    
const trackSlice = createSlice({
    name: "tracks",
    initialState: reduxInitialStateTrack,
    reducers: {
        trackUpdate: (state, action) => {
            state.track = action.payload.track
        }
    }
})

export const { trackUpdate } = trackSlice.actions
export default trackSlice.reducer