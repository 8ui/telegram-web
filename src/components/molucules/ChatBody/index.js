import Dom from '@dom'
import Message from '@molucules/Message'
import MessageInput from '@molucules/MessageInput'
import './styles.scss'

class ChatBody extends Dom.Component {
  render() {
    return (
      <div className="chat-body">
        <div className="message-container">
          <Message type="text" />
          <Message type="text" />
          <Message type="text" my />
          <Message type="text" />
          <Message type="text" my />
          <Message type="audio" />
        </div>
        <MessageInput />
      </div>
    )
  }
}

export default ChatBody;
