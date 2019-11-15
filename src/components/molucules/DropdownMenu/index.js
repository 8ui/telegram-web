import Dom from '@dom'
import Icon from '@atoms/Icon'
import DropdownItem from '@atoms/DropdownItem'
import './styles.scss'


class DropdownMenu extends Dom.Component {
  componentWillUnmount() {
    console.log('DropdownMenu componentWillUnmount');
  }

  renderItem = (props, i) => {
    const { onChange } = this.props;
    return (<DropdownItem key={props.code} {...props} onChange={onChange} />)
  }

  render() {
    const { data, ref } = this.props;
    // console.log('render', data);
    return (
      <div
        ref={ref}
        className="dropdown-menu"
      >
        {data.length && (
          <div className="dropdown-menu__wrapper">
            {data.map(this.renderItem)}
          </div>
        )}
      </div>
    )
  }
}

DropdownMenu.defaultProps = {
}

export default DropdownMenu;
