import Dom from '@dom'
import Icon from '@atoms/Icon'
import './styles.scss'


class DropdownItem extends Dom.Component {
  render() {
    const {
      onChange, selected, icon, name, code, placeholder, key, flag,
    } = this.props;

    return (
      <div
        key={key}
        className={`dropdown-item${selected ? ' dropdown-item--active' : ''}`}
        onMouseDown={() => onChange(code, this.props)}
      >
        <div className="dropdown-item__icon">
          {flag}
        </div>
        <div className="dropdown-item__text">
          {name}
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
