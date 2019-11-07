import Dom from '@dom'

import SidebarLeft from '@organisms/SidebarLeft'
import SidebarRight from '@organisms/SidebarRight'
import Chat from '@organisms/Chat'
import './styles.scss'

class Home extends Dom.Component {
  onClick = (e) => {
    e.preventDefault()
  }

  render() {
    const data = { foo: 'bar' };
    return (
      <div className="messenger">
        <SidebarLeft />
        <Chat />
        <SidebarRight />
      </div>
    )
  }
}

export default Home;
