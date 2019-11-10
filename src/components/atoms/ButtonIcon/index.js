import Dom from '@dom'
import classNames from 'classnames';
import './styles.scss'


class ButtonIcon extends Dom.Component {
  render() {
    const {
      name,
      onClick,
      primary,
      size,
    } = this.props;

    return (
      <div
        onClick={onClick}
        className={classNames('button-icon', `button-icon--${size}`, { 'button-icon--primary': primary })}
      >
        <input type="checkbox" />
        <div className="button-icon__active"></div>
        <div className="button-icon__hover"></div>
        <i className={`icon icon-${name}`}></i>
      </div>
    )
  }
}

ButtonIcon.defaultProps = {
  size: 'm',
  primary: false,
}

export default ButtonIcon;
