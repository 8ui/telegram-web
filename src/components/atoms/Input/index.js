import Dom, { addEventListener, removeEventListener } from '@dom'
import classNames from 'classnames';
import Loading from '@atoms/Loading'
import ButtonIcon from '@atoms/ButtonIcon'
import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile'
import './styles.scss'


class Input extends Dom.Component {
  constructor(props) {
    super(props)

    this.timeout = null
    this.events = 'focus keydown keyup propertychange blur paste cut copy mousedown mouseup';

    this.state = {
      passwdVisible: false,
    }
  }

  componentDidMount() {
    this.input = this.elem.getElementsByTagName('input')[0]
    addEventListener(
      this.input,
      this.events,
      this.onCaretMove
    );

    if (this.props.focus) {
      this.input.focus();
    }
  }

  componentWillUnmount() {
    // console.log('Input', 'componentWillUnmount');
    removeEventListener(
      this.input,
      this.events,
      this.onCaretMove
    );
  }

  componentDidUpdate() {
    this.input = this.elem.getElementsByTagName('input')[0]
    console.warn('Input', 'componentDidUpdate', this.props);
  }

  onTogglePasswdVisible = (e) => {
    const { onTogglePasswdVisible } = this.props;
    this.state.passwdVisible = !this.state.passwdVisible

    const icon = e.target.parentElement.getElementsByClassName('icon')[0]
    icon.classList.toggle('icon-eye1');
    icon.classList.toggle('icon-eye2');

    this.input.type = this.state.passwdVisible ? 'text' : 'password'

    if (onTogglePasswdVisible) onTogglePasswdVisible(this.state.passwdVisible);

    this.input.focus();
  }

  caretSetTimeoutAnimate = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.elem.classList.add('input--caret-animated');
    }, 400);
  }

  onCaretMove = (e) => {
    // console.log(e.type);
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
        if (value) this.elem.classList.add('input--with-value');
        caret.style.display = 'block';
        break;
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

    if (['focus'].includes(e.type)) {
      switch (this.input.selectionDirection) {
        case 'forward': selection = selectionEnd; break;
        case 'none':
        case 'backward': selection = selectionStart; break;
        default:
      }
    }

    const { type } = this.input
    const val = (type === 'password' ? '●'.repeat(value.length) : value)
    const container = this.elem.getElementsByClassName('input__caret-container')[0].children[0];
    container.innerHTML = val.substring(0, selection + offset).replace(/\n$/, '\n\u0001');
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

  rightAddons = () => {
    const { rightAddons, rightAddonsClick } = this.props;
    const props = rightAddonsClick ? {onClick: rightAddonsClick} : {};
    return (
      <div {...props} className="addons">
        {rightAddons}
      </div>
    )
  }

  renderLoading = () => (
    <div className="addons">
      <Loading />
    </div>
  )

  renderPasswdToggle = () => (
    <div className="addons">
      <ButtonIcon onClick={this.onTogglePasswdVisible} name="eye1" />
    </div>
  )

  renderRight = () => {
    const { rightAddons, loading, input } = this.props;

    if (loading) {
      return this.renderLoading();
    }
    if (rightAddons) {
      return this.rightAddons();
    }
    if (input.type === 'password') {
      return this.renderPasswdToggle()
    }
    return null;
  }

  onChange = (e) => {
    const { onChange, onKeyUp, phoneFormat } = this.props;
    if (onChange && e.type !== 'change') return ;
    if (onKeyUp && e.type !== 'keyup') return ;
    let value = e.target.value;
    // console.warn('phoneFormat', phoneFormat);
    if (phoneFormat) {
      // console.log('number', e.target.value, phoneFormat);
      const number = parsePhoneNumberFromString(e.target.value.replace(/\s/g, ''), phoneFormat);
      if (number && number.isValid()) {
        value = number.formatInternational();
        e.target.value = value;
      } else {
        value = null;
      }
    }

    if (onChange) onChange({ target: { value } });
    if (onKeyUp) onKeyUp({ target: { value } });
  }

  render () {
    const {
      label,
      size,
      placeholder,
      input,
      rightAddons,
      value,
      onKeyUp,
      onChange,
      error,
      errorLabel,
      parent,
      ...props
    } = this.props;
    console.warn('Input error', error);
    return (
      <div
        className={classNames(
          'input', size,
          { 'input--error': error },
          { 'input--with-value': !!value },
          { 'input--with-addons': !!rightAddons },
        )}
        {...props}
      >
        <span>
          {this.renderLabel()}
          <span>
            <input
              autocomplete="off"
              onKeyUp={this.onChange}
              onChange={this.onChange}
              placeholder={placeholder}
              type="text"
              spellcheck="false"
              {...input}
              className="input-field"
              value={value}
            />
            {this.renderCaret()}
            {this.renderRight()}
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
