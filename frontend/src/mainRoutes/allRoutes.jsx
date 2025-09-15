import { Route, Routes } from 'react-router-dom'
import Register from '../pages/register'
import Login from '../pages/login'
import Chat from '../pages/chat'

const AllRoutes = () => {
  return (
    <Routes> 
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
    </Routes>
  )
}

export default AllRoutes
