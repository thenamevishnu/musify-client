import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../Pages/MainPage'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignupPage'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route path='' Component={MainPage} />
                    <Route path='signup' Component={SignupPage} />
                    <Route path='login' Component={LoginPage} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
