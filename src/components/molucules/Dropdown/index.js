import Dom from '@dom'
import Icon from '@atoms/Icon'
import Input from '@atoms/Input'
import DropdownMenu from '@molucules/DropdownMenu'
import './styles.scss'


class Dropdown extends Dom.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      error: false,
      value: this.props.value || ['', ''],
    }

    this.menuRef = Dom.createRef();
  }

  componentDidUpdate() {

  }

  componentDidMount() {
    document.body.addEventListener('mousedown', this.onHide);
  }

  componentWillUnmount() {
    console.warn('Dropdown', 'document.body.removeEventListener', 'mousedown');
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
    this.state.value = props;
    this.onSearch('');
    this.replace(
      this.elem.children[0].children[0].id,
      this.renderTrigger
    )
    this.elem.classList.remove('dropdown--active');
  }

  onSearch = (value) => {
    if (value === this.state.search) return;
    console.log(value === this.state.search);
    this.setState({search: value}, () => {
      this.replace(
        this.menuRef.id,
        this.renderDropdownMenu,
        { replaceChilds: true, setAttrs: false }
      );
    })
  }

  onInputBlur = ({ target }) => {
    const { value } = this.state;
    console.log(value[1], target.value);
    if (value[1] != target.value) {
      target.value = value[1];
      setTimeout(() => this.onSearch(''), 300)
    }
  }

  renderTrigger = () => {
    const { value, error } = this.state;
    const { label, children } = this.props;
    return (
      children || (
        <Input
          rightAddons={<Icon name="down" />}
          label={label}
          onChange={(e) => this.onSearch(e.target.value)}
          value={value[1]}
          error={error}
          input={{
            blur: this.onInputBlur,
          }}
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

  renderDropdownMenu = () => {
    const {
      children, label, data, ...props
    } = this.props;
    const items = this.filterData();

    return (
      <DropdownMenu
        ref={this.menuRef}
        data={items}
        {...props}
        onChange={this.onChange}
      />
    )
  }

  render() {
    return (
      <div
        className="dropdown"
        onMouseDown={this.onDropdownClick}
      >
        <div onMouseDown={this.onShow} className="dropdown-trigger">
          {this.renderTrigger()}
        </div>
        {this.renderDropdownMenu()}
      </div>
    )
  }
}

Dropdown.defaultProps = {
}

export default Dropdown;
