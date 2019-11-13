import Dom from '@dom'
import classNames from 'classnames';
import './styles.scss'


class Button extends Dom.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 'text'
    }
  }

  onMouseDown = (e) => {
    try {
      const Bubble = this.elem.children[1];
      const width = Math.max(e.layerX, this.elem.offsetWidth - e.layerX) * 2;
      Bubble.style.animationName = '';
      void Bubble.offsetWidth;
      Bubble.style.animationName = 'buttonActiveAnimate';
      Bubble.style.left = `${e.layerX - width / 2}px`
      Bubble.style.top = `${e.layerY - width/ 2}px`
      Bubble.style.width = `${width}px`
      Bubble.style.height = `${width}px`
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    const {
      loading,
      loadingText,
      children,
      onClick,
      className,
    } = this.props;

    return (
      <div
        onMouseDown={this.onMouseDown}
        onClick={onClick}
        className={classNames('button', className)}
      >
        <span className="button__text">{this.state.value} {children}</span>
        <span className="button__active"></span>
      </div>
    )
  }
}

export default Button;
