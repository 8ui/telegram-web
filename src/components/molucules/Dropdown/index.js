import Dom from '@dom'
import Icon from '@atoms/Icon'
import Input from '@atoms/Input'
import DropdownMenu from '@molucules/DropdownMenu'
import './styles.scss'


class Dropdown extends Dom.Component {
  componentDidmount() {
    document.body.addEventListener('mousedown', this.hide);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.hide);
  }

  hide = () => {
    this.elem.classList.remove('dropdown--active')
  }

  onToggle = () => {
    this.elem.classList.toggle('dropdown--active')
  }

  onDropdownClick = (e) => {
    e.stopPropagation();
  }

  onChange = (...props) => {
    const { onChange } = this.props;
    onChange(...props);
    this.hide();
  }

  renderTrigger = () => {
    const { placeholder, children } = this.props;
    return (
      children || (
        <Input
          rightAddons={<Icon name="down" />}
          placeholder={placeholder}
        />
      )
    )
  }

  render() {
    const {
      children, placeholder, ...props
    } = this.props;

    return (
      <div
        className="dropdown"
        onMouseDown={this.onDropdownClick}
      >
        <div onMouseDown={this.onToggle} className="dropdown-trigger">
          {this.renderTrigger()}
        </div>
        <DropdownMenu {...props} onChange={this.onChange} />
      </div>
    )
  }
}

Dropdown.defaultProps = {
}

export default Dropdown;
