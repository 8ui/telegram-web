import Dom from '@dom'
import ButtonIcon from '@atoms/ButtonIcon'
import Divider from '@atoms/Divider'
import SearchBox from '@molucules/SearchBox'
import ContactItem from '@molucules/ContactItem'
import './styles.scss'

class SidebarLeft extends Dom.Component {
  render() {
    return (
      <div className="sidebar-left">
        <div className="sidebar-left__header">
          <ButtonIcon name="menu" onClick={(e) => console.log(e)} />
          <SearchBox />
        </div>
        <div className="sidebar-left__body">
          <ContactItem pinned />
          <ContactItem />
          <Divider />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
        </div>
      </div>
    )
  }
}

export default SidebarLeft;
