import { useContext } from "react"
import { context } from "../wrapper"
import FriendList from "../components/chat/frendList";


const Chat = () => {
  const [user, setUser] = useContext(context);
  return (
    <>
      <FriendList />
    </>
  )
}

export default Chat
