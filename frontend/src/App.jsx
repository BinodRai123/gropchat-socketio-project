import AllRoutes from "./mainRoutes/allRoutes"
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // connect to backend

const App = () => {
  return (
   <>
     <AllRoutes />
   </>
  )
}

export default App