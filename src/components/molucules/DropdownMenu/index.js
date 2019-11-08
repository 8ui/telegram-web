import Dom from '@dom'
import Icon from '@atoms/Icon'
import DropdownItem from '@atoms/DropdownItem'
import './styles.scss'


class DropdownMenu extends Dom.Component {
  renderItem = (props, i) => {
    const { onChange } = this.props;
    return (<DropdownItem key={`dropdown-${i}`} {...props} onChange={onChange} />)
  }

  render() {
    const { data } = this.props;

    return (
      <div
        className="dropdown-menu"
      >
        <div className="dropdown-menu__wrapper">
          {data.map(this.renderItem)}
        </div>
      </div>
    )
  }
}

DropdownMenu.defaultProps = {
}

export default DropdownMenu;
