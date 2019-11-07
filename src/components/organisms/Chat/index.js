import Dom from '@dom'
import ChatHeader from '@molucules/ChatHeader'
import ChatBody from '@molucules/ChatBody'
import './styles.scss'

class Chat extends Dom.Component {
  render() {
    return (
      <div className="chat">
        <ChatHeader />
        <ChatBody />
      </div>
    )
  }
}

export default Chat;
