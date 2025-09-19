import { createContext, useState, useEffect } from "react";
import { isUserLoggedIn } from "./store/actions/userAction";

export const context = createContext(null);

const Wrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await isUserLoggedIn();
        setUser(response.data.id.id);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <context.Provider value={[user, setUser]}>{children}</context.Provider>
  );
};

export default Wrapper;
