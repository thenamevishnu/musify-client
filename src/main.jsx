import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import { Store, persistor } from './Redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { MyProvider } from './context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={Store}>
            <MyProvider>
                <App />
            </MyProvider>
        </Provider>    
    </PersistGate>
)
