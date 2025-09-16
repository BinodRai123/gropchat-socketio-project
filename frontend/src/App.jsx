import { useEffect } from "react";
import AllRoutes from "./mainRoutes/allRoutes"
import { io } from "socket.io-client";
import axios from "./utils/axios";

const socket = io("http://localhost:3000",{
  withCredentials: true
});

const App = () => {

  useEffect(() => {
    const fetchOnlineUsers = async() => {
      socket.on("online_users",(friends) => {
        console.log(friends);
      })
    }

    fetchOnlineUsers();
  })

  return (
   <>
     <AllRoutes />
   </>
  )
}

export default App