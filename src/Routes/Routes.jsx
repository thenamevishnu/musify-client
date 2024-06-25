import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import AdminHomePage from '../Pages/Admin/AdminHomePage'
import AdminAuth from '../ProtectedRoutes/AdminAuth'
import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
import AdminUserManagePage from '../Pages/Admin/AdminUserManagePage'
import AdminTrackManagePage from '../Pages/Admin/AdminTrackManagePage'
import AdminRequestsPage from '../Pages/Admin/AdminRequestsPage'
import AdminReportsPage from '../Pages/Admin/AdminReportsPage'

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

                <Route path='admin'>

                    <Route path='' element={ <Navigate to={`/admin/${ import.meta.env.VITE_ADMIN_HOME }`} /> } />

                    <Route path={ import.meta.env.VITE_ADMIN_HOME } element={
                        <AdminAuth>
                            <AdminHomePage />
                        </AdminAuth>
                    } />

                    <Route path='login' element={
                        <AdminAuth login>
                            <AdminLoginPage />
                        </AdminAuth>
                    } />

                    <Route path='report' Component={AdminReportsPage} />

                    <Route path='manage'>

                        <Route path='users' element={
                            <AdminAuth>
                                <AdminUserManagePage />
                            </AdminAuth>
                        } />

                        <Route path='tracks' element={
                            <AdminAuth>
                                <AdminTrackManagePage />
                            </AdminAuth>
                        } />

                        <Route path='requests' element={
                            <AdminAuth>
                                <AdminRequestsPage />
                            </AdminAuth>
                        } />

                    </Route>

                </Route>

                <Route path='*' Component={PageNotFound} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
