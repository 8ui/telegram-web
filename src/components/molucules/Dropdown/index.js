import Dom from '@dom'
import Icon from '@atoms/Icon'
import Input from '@atoms/Input'
import DropdownMenu from '@molucules/DropdownMenu'
import './styles.scss'


class Dropdown extends Dom.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: null,
    }
  }

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

  onSearch = ({ target: { value } }) => {
    console.log(value);
    this.setState({ search: value });
  }

  renderTrigger = () => {
    const { search } = this.state;
    const { label, children } = this.props;
    return (
      children || (
        <Input
          rightAddons={<Icon name="down" />}
          label={label}
          onChange={this.onSearch}
          value={search}
        />
      )
    )
  }

  filterData = () => {
    const search = (this.state.search || '').toLowerCase();
    const { data } = this.props;
    let r = data;

    if (search) {
      r = r.filter(n => n.text.toLowerCase().indexOf(search) > -1)
    }
    return r;
  }

  render() {
    const {
      children, label, data, ...props
    } = this.props;

    const items = this.filterData();

    return (
      <div
        className="dropdown"
        onMouseDown={this.onDropdownClick}
      >
        <div onMouseDown={this.onShow} className="dropdown-trigger">
          {this.renderTrigger()}
        </div>
        <DropdownMenu data={items} {...props} onChange={this.onChange} />
      </div>
    )
  }
}

Dropdown.defaultProps = {
}

export default Dropdown;
