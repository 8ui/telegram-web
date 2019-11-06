import Dom from '@dom'
import './styles.scss'


class ButtonIcon extends Dom.Component {
  render() {
    const { name, onClick } = this.props;
    return (
      <div className="avatar">
        <i className={`icon icon-avatar_savedmessages`}></i>
      </div>
    )
  }
}

export default ButtonIcon;
