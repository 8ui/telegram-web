import Dom from '@dom'
import Icon from '@atoms/Icon'
import './styles.scss'


class DropdownItem extends Dom.Component {
  render() {
    const {
      onChange, selected, icon, text, value, placeholder,
    } = this.props;

    return (
      <div
        className={`dropdown-item${selected ? ' dropdown-item--active' : ''}`}
        onClick={() => onChange(value, text)}
      >
        <div className="dropdown-item__icon">
          <Icon name={icon} />
        </div>
        <div className="dropdown-item__text">
          {text}
        </div>
        <div className="dropdown-item__placeholder">
          {placeholder}
        </div>
      </div>
    )
  }
}

DropdownItem.defaultProps = {
  icon: 'newchannel',
}

export default DropdownItem;
