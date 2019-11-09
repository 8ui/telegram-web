import Dom, { addEventListener } from '@dom'
import './styles.scss'


class Input extends Dom.Component {
  // constructor(props) {
  //   super(props)
  //
  //   this.wrapper = React.createRef();
  // }

  componentDidMount() {
    this.input = this.elem.getElementsByTagName('input')[0]

    addEventListener(this.input, 'keydown keyup propertychange blur paste cut copy mousedown mouseup change', this.onCaretMove);
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

    switch (e.type) {
      case 'blur':
        return caret.style.display = 'none';
      case 'mousedown':
        return caret.style.display = 'none';
      case 'mouseup':
        caret.style.display = 'block';
      case 'keydown': {
        switch (e.keyCode) {
          case 8:
          case 37:
            offset -= 1;
            break;
          case 39:
            offset += 1;
            break;
          default:
        }

        if (String(e.key).length === 1) {
          offset += 1;
          value += e.key;
        }
      }
      default:
    }
    const container = this.elem.getElementsByClassName('input__caret-container')[0];
    container.innerHTML = value.substring(0, this.input.selectionEnd + offset).replace(/\n$/, '\n\u0001');
    caret.style.transform = `translateX(${container.offsetWidth + 16}px)`;
    this.caretSetTimeoutAnimate();
  }

  renderCaret = () => {
    return ([
      <div className="input__caret" />,
      <pre className="input__caret-container" />
    ])
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
      error,
      label,
      size,
      placeholder,
      input,
      rightAddons,
      value,
      onChange,
      ...props
    } = this.props;

    return (
      <div
        ref={this.wrapper}
        className={`input ${size} ${value ? 'active' : ''}`}
        {...props}
      >
        <span>
          {!!label && <label>{label}</label>}
          <span>
            <input
              {...input}
              value={value}
              onChange={onChange}
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
