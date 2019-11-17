import Dom from '@dom'

import Chats from '@organisms/Chats'
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
        <Chats />
        <Chat />
        <SidebarRight />
      </div>
    )
  }
}

export default Home;
