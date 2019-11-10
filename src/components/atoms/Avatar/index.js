import Dom from '@dom'
import './styles.scss'


class ButtonIcon extends Dom.Component {
  render() {
    const {
      size, name, onClick, online,
    } = this.props;

    const props = size ? { style: { width: size + 'px', height: size + 'px' } } : {};
    return (
      <div {...props} className={`avatar${online ? ' avatar--online' : ''}`}>
        <i className={`icon icon-avatar_savedmessages`}></i>
      </div>
    )
  }
}

export default ButtonIcon;
