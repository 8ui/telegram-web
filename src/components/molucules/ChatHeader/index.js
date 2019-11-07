import Dom from '@dom'
import Avatar from '@atoms/Avatar'
import ButtonIcon from '@atoms/ButtonIcon'
import './styles.scss'

class ChatHeader extends Dom.Component {
  render() {
    return (
      <div className="chat-header">
        <div className="chat-header__user">
          <Avatar size={44} />
          <div>
            <div className="chat-header__user__title">
              Karen Stanford
            </div>
            <div className="chat-header__user__subtitle">
              online
            </div>
            {/* <div className="chat-header__user__subtitle">
              335,356 subscribers
            </div> */}
          </div>
        </div>
        <div className="chat-header__actions">
          <ButtonIcon name="search" />
          <ButtonIcon name="more" />
        </div>
      </div>
    )
  }
}

export default ChatHeader;
