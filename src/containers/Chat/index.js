import Dom from '@dom'

import SidebarLeft from '@organisms/SidebarLeft'
import './styles.scss'

class Home extends Dom.Component {
  onClick = (e) => {
    e.preventDefault()
  }

  render() {
    const data = { foo: 'bar' };
    return (
      <div className="chat">
        <SidebarLeft />
      </div>
    )
  }
}

export default Home;
