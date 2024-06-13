import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../Pages/MainPage'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignupPage'
import { Auth } from '../ProtectedRoutes/Auth'
import AboutPage from '../Pages/AboutPage'
import ProfilePage from '../Pages/ProfilePage'
import SettingsPage from '../Pages/SettingsPage'
import MyTracksPage from '../Pages/MyTracksPage'
import { OnlyForSingers } from '../ProtectedRoutes/Roles'
import PageNotFound from '../Pages/PageNotFound'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route path='' element={<Auth><MainPage /></Auth>} />
                    
                    <Route path='signup' element={ <Auth route={"signup"}><SignupPage /></Auth> } />
                    <Route path='login' element={<Auth route={"login"}><LoginPage /></Auth>} />
                    
                    <Route path='about' Component={AboutPage} />
                    <Route path='profile' element={<Auth><ProfilePage /></Auth>} />
                    <Route path='settings' element={<Auth><SettingsPage /></Auth>} />
                    
                    <Route path='my-tracks' element={
                        <Auth>
                            <OnlyForSingers>
                                <MyTracksPage />
                            </OnlyForSingers>
                        </Auth>
                    } />
                
                </Route>

                <Route path='*' Component={PageNotFound} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
