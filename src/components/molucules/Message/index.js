import Dom from '@dom'
import './styles.scss'

import Icon from '@atoms/Icon'


class Message extends Dom.Component {
  renderReplyText = () => {
    return (
      <div className="message-reply">

      </div>
    )
  }

  renderAudio = () => {
    return (
      <div className="message-bubble">
        <div className="message-audio">
          <div className="message-audio__play">
            <Icon name="play" />
          </div>
          <div>
            <div className="message-audio__timeline"></div>
            <div className="message-audio__duration">3:24</div>
          </div>
        </div>
      </div>
    )
  }

  renderSticker = () => {

  }

  renderFile = () => {

  }

  renderText = () => {
    const { my } = this.props;
    return (
      <div className="message-bubble">
        <div className="message-text">
          Where are you now?
        </div>
      </div>
    )
  }

  render() {
    const { my, type } = this.props;

    let render = null;
    switch (type) {
      case 'text':
        render = this.renderText()
        break;
      case 'audio':
        render = this.renderAudio()
        break;
      default:
    }

    const className = `message ${my ? 'message-my' : ''}`;

    return (
      <div className={className}>
        {render}
      </div>
    )
  }
}

export default Message;
