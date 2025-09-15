import { createContext, useState } from "react";

export const context = createContext(null);
import { useEffect } from "react";
import axios from "./utils/axios";

const Wrapper = (props) => {
  const [user, setUser] = useState();

  //Is user logged in or not 
  useEffect(() => {
    axios.get("/api/auth/me")
      .then((res) => {
        setUser(res.data.id.id);
      })
      .catch((err) => {
        console.log("Not logged in");
    });

  }, [])

  return (
    <>
      <context.Provider value={user}>{props.children}</context.Provider>
    </>
  );
};

export default Wrapper;
