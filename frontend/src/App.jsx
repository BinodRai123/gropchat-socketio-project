import AllRoutes from "./mainRoutes/allRoutes"
import { io } from "socket.io-client";

const socket = io("http://localhost:3000",{
  withCredentials: true
});

const App = () => {
  console.log(socket);
  return (
   <>
     <AllRoutes />
   </>
  )
}

export default App