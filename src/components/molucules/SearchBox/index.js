import Dom from '@dom'
import Icon from '@atoms/Icon'
import './styles.scss'

class SearchBox extends Dom.Component {
  render() {
    return (
      <div className="search-box">
        <input placeholder="Search" type="text" className="search-box__input"/>
        <Icon name="search" />
      </div>
    )
  }
}

export default SearchBox;
