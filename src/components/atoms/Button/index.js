import Dom from '@dom'
import classNames from 'classnames';
import './styles.scss'


class Button extends Dom.Component {
  onMouseDown = (e) => {
    const Bubble = this.elem.getElementsByClassName('button__active')[0];
    const width = Math.max(e.layerX, this.elem.offsetWidth - e.layerX) * 2;
    Bubble.style.animationName = '';
    void Bubble.offsetWidth;
    Bubble.style.animationName = 'buttonActiveAnimate';
    Bubble.style.left = `${e.layerX - width / 2}px`
    Bubble.style.top = `${e.layerY - width/ 2}px`
    Bubble.style.width = `${width}px`
    Bubble.style.height = `${width}px`
  }

  render() {
    const {
      icon,
      loading,
      loadingText,
      children,
      onClick,
      className,
    } = this.props;

    return (
      <a onMouseDown={this.onMouseDown} onClick={onClick} className={classNames('button', className)}>
        <span className="button__text">{children}</span>
        <span className="button__hover"></span>
        <span className="button__active"></span>
      </a>
    )
  }
}

export default Button;
