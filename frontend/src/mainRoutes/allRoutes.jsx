import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react';
import AuthWrapper from "./authWrapper.jsx"

const Register = lazy(() => import("../pages/register"))
const Login = lazy(() => import("../pages/login"))
const Chat = lazy(() => import("../pages/chat"))
const ProfileImageUpload = lazy(() => import("../pages/ProfileImage.jsx"))

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<AuthWrapper><Chat /> </AuthWrapper>} />
        <Route path='/profileImage' element={<AuthWrapper><ProfileImageUpload /></AuthWrapper>} />
    </Routes>
  )
}

export default AllRoutes
