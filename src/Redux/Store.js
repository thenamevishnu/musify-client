import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import userReducer from "./userSlice"
import { configureStore } from "@reduxjs/toolkit"

const persistConfig = {
    key: "root",
    storage
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const Store = configureStore({   
    reducer: {
        users: persistedUserReducer
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