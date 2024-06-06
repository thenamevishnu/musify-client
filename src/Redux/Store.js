import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import userSlice from "./userSlice"
import playingSlice from "./playingSlice"
import { configureStore } from "@reduxjs/toolkit"
import recentSlice from "./recentSlice"

const persistConfig1 = {
    key: "root1",
    storage
}

const persistConfig2 = {
    key: "root2",
    storage
}

const persistConfig3 = {
    key: "root3",
    storage
}

const persistedUserReducer = persistReducer(persistConfig1, userSlice)
const persistedPlayReducer = persistReducer(persistConfig2, playingSlice)
const persistedRecentReducer = persistReducer(persistConfig3, recentSlice)

export const Store = configureStore({   
    reducer: {
        users: persistedUserReducer,
        playing: persistedPlayReducer,
        recent: persistedRecentReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'],
            }
        })
    }
})

export const persistor = persistStore(Store)