import Dom from '@dom'
import Avatar from '@atoms/Avatar'
import './styles.scss'

class ContactItem extends Dom.Component {
  render() {
    return (
      <div className="contact-item">
        <Avatar />
      </div>
    )
  }
}

export default ContactItem;
