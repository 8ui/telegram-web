import Dom, { addEventListener, removeEventListener } from '@dom'
import classNames from 'classnames';
import './styles.scss'


class Input extends Dom.Component {
  componentDidMount() {
    this.input = this.elem.getElementsByTagName('input')[0]
    addEventListener(
      this.input,
      'focus keydown keyup propertychange blur paste cut copy mousedown mouseup',
      this.onCaretMove
    );
  }

  componentWillUnmount() {
    removeEventListener(
      this.input,
      'focus keydown keyup propertychange blur paste cut copy mousedown mouseup',
      this.onCaretMove
    );
  }

  componentDidUpdate() {
    // this.input = this.elem.getElementsByTagName('input')[0]
  }

  timeout = null

  caretSetTimeoutAnimate = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.elem.classList.add('input--caret-animated');
    }, 400);
  }

  onCaretMove = (e) => {
    this.elem.classList.remove('input--caret-animated');
    const caret = this.elem.getElementsByClassName('input__caret')[0];

    let offset = 0;
    let { value } = this.input;

    const { selectionStart, selectionEnd } = this.input
    let selection = selectionEnd;
    const select = !!(selectionEnd - selectionStart)
    switch (e.type) {
      case 'blur': {
        this.elem.classList.remove('input--active');
        if (!value) this.elem.classList.remove('input--with-value');
        return caret.style.display = 'none'
      }
      case 'focus': {
        this.elem.classList.add('input--active');
      }
      case 'mousedown': return caret.style.display = 'none';
      case 'mouseup': caret.style.display = 'block'; break
      case 'keydown': {
        if (select && !e.shiftKey) break;
        switch (e.keyCode) {
          case 8:
          case 37: offset -= 1; break;
          case 39: offset += 1; break;
          default:
        }

        if (String(e.key).length === 1) {
          offset += 1;
          value += e.key;
          if (!value) this.elem.classList.add('input--with-value');
        }
      }
      case 'keyup': {
        if (value) this.elem.classList.add('input--with-value');
      }
      default:
    }

    switch (this.input.selectionDirection) {
      case 'forward': selection = selectionEnd; break;
      case 'none':
      case 'backward': selection = selectionStart; break;
      default:
    }

    const container = this.elem.getElementsByClassName('input__caret-container')[0].children[0];
    container.innerHTML = value.substring(0, selection + offset).replace(/\n$/, '\n\u0001');
    caret.style.transform = `translateX(${container.offsetWidth + 16}px)`;
    this.caretSetTimeoutAnimate();
  }

  renderCaret = () => {
    return ([
      <div className="input__caret" />,
      <div className="input__caret-container"><pre></pre></div>,
    ])
  }

  renderLabel = () => {
    const { label, error, errorLabel } = this.props;
    return [
      !!label && !error && <label><div>{label}</div></label>,
      error && !!errorLabel && <label><div>{errorLabel}</div></label>,
    ]
  }

  renderRight = () => {
    const { rightAddons } = this.props;
    if (!rightAddons) return null;

    return (
      <div className="addons">
        {rightAddons}
      </div>
    )
  }

  render () {
    const {
      label,
      size,
      placeholder,
      input,
      rightAddons,
      value,
      onChange,
      error,
      errorLabel,
      ...props
    } = this.props;

    return (
      <div
        className={classNames(
          'input', size,
          { 'input--error': error },
          { 'input--active': !!value },
          { 'input--with-addons': !!rightAddons },
        )}
        {...props}
      >
        <span>
          {this.renderLabel()}
          <span>
            <input
              {...input}
              className="input-field"
              value={value}
              onKeyUp={onChange}
              placeholder={placeholder}
              type="text"
              spellcheck="false"
            />
            {this.renderRight()}
            {this.renderCaret()}
          </span>
        </span>
      </div>
    )
  }
}

Input.defaultProps = {
  size: 'm',
  input: {},
}

export default Input;
