import Dom from '@dom'
import './styles.scss'


class ButtonIcon extends Dom.Component {
  render() {
    const { name, onClick } = this.props;
    return (
      <a onClick={onClick} className="button-icon">
        <i className={`icon icon-${name}`}></i>
      </a>
    )
  }
}

export default ButtonIcon;
