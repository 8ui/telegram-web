import Dom from '@dom'
import Icon from '@atoms/Icon'
import Input from '@atoms/Input'
import DropdownMenu from '@molucules/DropdownMenu'
import './styles.scss'


class Dropdown extends Dom.Component {
  componentDidUpdate() {

  }

  componentDidMount() {
    document.body.addEventListener('mousedown', this.onHide);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.onHide);
  }

  onShow = () => {
    this.elem.classList.add('dropdown--active')
    this.elem.classList.remove('dropdown--hide');
  }

  onHide = () => {
    if (this.elem.classList.contains('dropdown--active')) {
      this.elem.classList.remove('dropdown--active');
      this.elem.classList.add('dropdown--hide');
    }
  }

  onDropdownClick = (e) => {
    e.stopPropagation();
  }

  onChange = (...props) => {
    const { onChange } = this.props;
    onChange(...props);
    this.elem.classList.remove('dropdown--active');
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
        <div onMouseDown={this.onShow} className="dropdown-trigger">
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
