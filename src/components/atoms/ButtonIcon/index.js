import Dom from '@dom'
import './styles.scss'


class ButtonIcon extends Dom.Component {
  render() {
    const { name, onClick } = this.props;
    return (
      <div onClick={onClick} className="button-icon">
        <input type="checkbox" />
        <div className="button-icon__active"></div>
        <i className={`icon icon-${name}`}></i>
      </div>
    )
  }
}

export default ButtonIcon;
