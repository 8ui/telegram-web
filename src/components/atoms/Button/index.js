import Dom from '@dom'
import classNames from 'classnames';
import Loading from '../Loading'
import './styles.scss'


class Button extends Dom.Component {
  onMouseDown = (e) => {
    try {
      const Bubble = this.elem.children[1];
      const width = Math.max(e.layerX, this.elem.offsetWidth - e.layerX) * 2;
      Bubble.style.animationName = '';
      void Bubble.offsetWidth;
      Bubble.style.animationName = 'buttonActiveAnimate';
      Bubble.style.left = `${e.layerX - width / 2}px`;
      Bubble.style.top = `${e.layerY - width/ 2}px`;
      Bubble.style.width = `${width}px`;
      Bubble.style.height = `${width}px`;
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    const {
      children,
      onClick,
      className,
      loading,
      loadingText,
      disabled,
    } = this.props;

    return (
      <div
        onMouseDown={this.onMouseDown}
        onClick={onClick}
        className={classNames(
          'button',
          className,
          { 'button--disabled': disabled },
          { 'button--loading': loading },
        )}
      >
        <span className="button__text">
          {loading ? <span>{loadingText}</span> : <span>{children}</span>}
        </span>
        <span className="button__active"></span>
        {loading && <Loading />}
      </div>
    )
  }
}

Button.defaultProps = {
  loadingText: 'Please wait...',
  loading: false,
  disabled: false,
}

export default Button;
