import Dom from '@dom'
import { $ } from '@core/utils'
import api from '@core/api'
import classNames from 'classnames'
import Divider from '@atoms/Divider'
import Avatar from '@atoms/Avatar'
import Icon from '@atoms/Icon'
import './styles.scss'

class ContactItem extends Dom.Component {
  constructor(props) {
    super(props);
    // this.getPhoto();
  }

  onMouseDown = (e) => {
    try {
      const Bubble = $('.contact-item__active', this.elem);
      const width = Math.max(e.layerX, this.elem.offsetWidth - e.layerX) * 2;
      Bubble.style.animationName = '';
      void Bubble.offsetWidth;
      Bubble.style.animationName = 'buttonActiveAnimate';
      Bubble.style.left = `${e.layerX - width / 2}px`;
      Bubble.style.top = `${e.layerY - width/ 2}px`;
      Bubble.style.width = `${width}px`;
      Bubble.style.height = `${width}px`;
    } catch (e) {
      console.warn(e);
    }
  }

  getPhoto = async() => {
    const { item } = this.props;
    console.log('item', item);
    if (!item.photo.small.remote.id) return;

    const client = await api();
    const data = await client.invoke({
      '@type': 'getRemoteFile',
      file_id: item.photo.small.remote.id,
      priority: 1
    });
    console.warn('data', data);
  }

  renderBadge = () => {
    const { item: { is_pinned, unread_count } } = this.props;
    if (!is_pinned && !unread_count) return;
    return (
      <div className={classNames('contact-item__badge', { 'contact-item__badge--pinned': is_pinned })}>
        {!is_pinned && unread_count}
      </div>
    );
  }

  renderContent = () => {
    const { item: { last_message, ...item } } = this.props;

    if (!last_message) return null;

    const { content } = last_message;
    let text = ''

    switch (content['@type']) {
      case 'messageText': {
        text = content.text.text;
        break;
      }
      case 'messageContactRegistered':
        text = `${item.title} just joined Telegram`; break;
      case 'messagePhoto':
        text = 'Photo'
      case 'messageVideo':
        text = 'Video'
      case 'messagePhoto':
      case 'messageVideo':
        switch (content.caption['@type']) {
          case 'formattedText':
            text += ', ' + content.caption.text
            break;
          default:
        }
        break;
      default:
        return null;
    }
    return (
      <div className="contact-item__subtitle">
        {text}
      </div>
    )
  }

  render() {
    const { item } = this.props;
    console.log('item', item);

    return (
      <div
        onMouseDown={this.onMouseDown}
        className="contact-item"
      >
        <div className="contact-item__wrapper">
          <Avatar online={0.5 > Math.random()} />
          <div className="contact-item__body">
            <div className="contact-item__title">
              <span>{item.title || 'Deleted account'}</span>
              <Icon name="checks" />
            </div>
            {this.renderContent()}
          </div>
          <div className="contact-item__info">
            <div className="contact-item__time">19:25</div>
            {this.renderBadge()}
          </div>
          <span className="contact-item__active"></span>
        </div>
        {item.is_pinned && (
          <Divider />
        )}
      </div>
    )
  }
}

export default ContactItem;
