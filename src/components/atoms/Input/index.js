import Dom from '@dom'
import './styles.scss'


class Input extends Dom.Component {
  // constructor(props) {
  //   super(props)
  //
  //   this.wrapper = React.createRef();
  // }

  onFocus = () => {
    this.wrapper.current.classList.add('active')
  }

  onBlur = () => {
    const { value } = this.props;
    if (!value) {
      this.wrapper.current.classList.remove('active')
    }
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
            />
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
