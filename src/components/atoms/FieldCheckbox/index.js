import Dom from '@dom'
import Icon from '@atoms/Icon'
import Checkbox from '@atoms/Checkbox'
import './styles.scss'


class FieldCheckbox extends Dom.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked,
    }

    this.checkboxRef = Dom.createRef();
  }

  onChange = (...props) => {
    const { onChange } = this.props;
    this.setState(
      ({ checked }) => ({ checked: !checked }),
      () => {
        console.log('this.renderChekbox', this.renderChekbox);
        this.replace(this.checkboxRef.id, this.renderChekbox);
      }
    )

    onChange(...props);
  }

  renderChekbox = () => {
    const { onChange, label, ...props } = this.props;

    return <Checkbox ref={this.checkboxRef} {...props} />
  }

  render () {
    const { label } = this.props;
    return (
      <div
        className="checkbox-field"
        onClick={this.onChange}
      >
        <div className="checkbox-field__container">
          <div className="checkbox-field__check">
            {this.renderChekbox()}
          </div>
          <div className="checkbox-field__label">
            {label}
          </div>
        </div>
      </div>
    )
  }
}

FieldCheckbox.defaultProps = {
  onChange: () => {}
}

export default FieldCheckbox;
