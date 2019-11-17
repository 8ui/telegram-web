import Dom from '@dom'
import Icon from '@atoms/Icon'
import ScrollView from '@molucules/ScrollView'
import DropdownItem from '@atoms/DropdownItem'
import './styles.scss'


class DropdownMenu extends Dom.Component {
  componentWillUnmount() {
    console.log('DropdownMenu componentWillUnmount');
  }

  renderItem = (props, i) => {
    const { onChange, value } = this.props;
    return (
      <DropdownItem
        selected={props.code === value}
        key={props.code}
        {...props}
        onChange={onChange}
      />
    )
  }

  render() {
    const { data } = this.props;
    // console.log('render', data);
    return (
      <div
        className="dropdown-menu"
      >
        {data.length && (
          <ScrollView>
            <div className="dropdown-menu__wrapper">
              {data.map(this.renderItem)}
            </div>
          </ScrollView>
        )}
      </div>
    )
  }
}

DropdownMenu.defaultProps = {
}

export default DropdownMenu;
