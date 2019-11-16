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
    }

    this.menuRef = Dom.createRef();
  }

  componentDidUpdate() {
    // console.warn('Dropdown componentDidUpdate', this.elem);
  }

  componentDidMount() {
    document.body.addEventListener('mousedown', this.onHide);
  }

  componentWillUnmount() {
    console.warn('Dropdown', 'document.body.removeEventListener', 'mousedown');
    document.body.removeEventListener('mousedown', this.onHide);
  }

  onShow = () => {
    // console.log(this);
    this.elem.getElementsByClassName('dropdown-menu__wrapper')[0].scrollTop = 0
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

  onChange = (code, props) => {
    const { onChange } = this.props;
    onChange(code, props);
    // this.state.value = props;
    // console.warn(...props);
    this.onSearch('');
    // this.replace(
    //   this.elem.children[0].children[0].id,
    //   this.renderTrigger
    // )
    if (props.name) {
      this.elem.getElementsByClassName('input')[0].classList.add('input--with-value')
      this.elem.getElementsByClassName('input')[0].value = props.name;
    }
    this.elem.classList.remove('dropdown--active');
  }

  onSearch = (value) => {
    this.setState({ search: value })
  }

  getValue = () => {
    return this.props.value
      ? this.props.data.find(n => n.code === this.props.value) || {name:''}
      : {name:''};
  }

  onInputBlur = ({ target }) => {
    setTimeout(() => {
      // console.log(this);
      if (this.getValue().name != target.value) {
        target.value = this.getValue().name;
        this.elem.getElementsByClassName('input')[0].classList.toggle('input--with-value', !!target.value)
        setTimeout(() => this.onSearch(''), 300)
      }
    }, 50)
  }

  renderTrigger = () => {
    const { error } = this.state;
    const { value, label, children } = this.props;
    // console.warn('this.getValue().name', this.getValue().name);
    if (children) return children;
    return (
      <Input
        rightAddons={<Icon name="down" />}
        label={label}
        onKeyUp={(e) => this.onSearch(e.target.value)}
        value={this.getValue().name}
        error={error}
        input={{
          onBlur: this.onInputBlur,
        }}
      />
    )
  }

  filterData = () => {
    const search = (this.state.search || '').toLowerCase();
    const { data } = this.props;
    let r = data;
    if (search) {
      r = r.filter(n => n.name.toLowerCase().indexOf(search) > -1)
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
