import { Route, Routes } from 'react-router-dom'
import Register from '../pages/register'
import Login from '../pages/login'
import Chat from '../pages/chat'
import AuthWrapper from './authWrapper'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<AuthWrapper><Chat /> </AuthWrapper>} />
    </Routes>
  )
}

export default AllRoutes
