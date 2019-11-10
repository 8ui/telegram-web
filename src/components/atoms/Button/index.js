import Dom from '@dom'
import './styles.scss'


class Button extends Dom.Component {
  render() {
    const {
      icon,
      onClick,
      loading,
      loadingText,
      children,
    } = this.props;
    return (
      <a onClick={onClick} className="button">
        {children}
      </a>
    )
  }
}

export default Button;
