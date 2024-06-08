import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../Pages/MainPage'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignupPage'
import { Auth } from '../ProtectedRoutes/Auth'
import AboutPage from '../Pages/AboutPage'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route path='' element={<Auth><MainPage /></Auth>} />
                    
                    <Route path='signup' element={ <Auth route={"signup"}><SignupPage /></Auth> } />
                    <Route path='login' element={<Auth route={"login"}><LoginPage /></Auth>} />
                    
                    <Route path='about' Component={AboutPage} />
                
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
