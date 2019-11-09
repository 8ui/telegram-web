import Dom from '@dom'
import Icon from '@atoms/Icon'
import Checkbox from '@atoms/Checkbox'
import './styles.scss'


class FieldCheckbox extends Dom.Component {

  render () {
    const { onChange, label, ...props } = this.props;
    return (
      <div
        className="checkbox-field"
        onClick={onChange}
      >
        <div className="checkbox-field__container">
          <div className="checkbox-field__check">
            <Checkbox {...props} />
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
