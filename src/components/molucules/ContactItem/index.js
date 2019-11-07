import Dom from '@dom'
import Avatar from '@atoms/Avatar'
import Icon from '@atoms/Icon'
import './styles.scss'

class ContactItem extends Dom.Component {
  renderBadge = () => {
    const { pinned } = this.props;

    return (
      <div className={`contact-item__badge${pinned ? ' contact-item__badge--pinned' : ''}`}>
        {pinned ? '' : 2}
      </div>
    )
  }

  render() {
    return (
      <div className="contact-item">
        <div className="contact-item__wrapper">
          <Avatar online={0.5 > Math.random()} />
          <div className="contact-item__body">
            <div className="contact-item__title">
              <span>Saved Messages</span>
              <Icon name="checks" />
            </div>
            <div className="contact-item__subtitle">
              Eat something
            </div>
          </div>
          <div className="contact-item__info">
            <div className="contact-item__time">19:25</div>
            {this.renderBadge()}
          </div>
        </div>
      </div>
    )
  }
}

export default ContactItem;
