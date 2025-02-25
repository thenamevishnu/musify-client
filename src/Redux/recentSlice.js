import { createSlice } from "@reduxjs/toolkit"
import { getTime } from "../Utils/helper"

export const reduxInitialStateRecent= {
    list: []
}
    
const recentSlice = createSlice({
    name: "recent",
    initialState: reduxInitialStateRecent,
    reducers: {
        addList: (state, action) => {
            if (state.list.some(item => item.trackId == action.payload.list.trackId)) {
                const item = state.list.findIndex(item => item.trackId == action.payload.list.trackId)
                state.list[item].last_played = getTime()
            } else {
                if (state.list.length == 20) {
                    state.list.pop()
                }
                state.list = [action.payload.list, ...state.list]
            }
        },
        removeList: (state, action) => {
            state.list = state.list.filter(item => item.trackId != action.payload.trackId)
        },
        clearList: (state, action) => {
            state.list = []
        }
    }
})

export const { addList, removeList, clearList } = recentSlice.actions
export default recentSlice.reducer