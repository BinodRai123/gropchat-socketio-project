import { useContext } from "react"
import { context } from "../wrapper"


const Chat = () => {
  const [user, setUser] = useContext(context);
  return (
    <div className="text-2xl">
      Name: {user}
    </div>
  )
}

export default Chat
