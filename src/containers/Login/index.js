import Dom from '@dom'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import './styles.scss'

class Login extends Dom.Component {
  state = {
    page: 1,
  }

  render() {
    const { page } = this.state;
    return (
      <div className="login">
        <Page1 />
        {/*<Page2 />*/}
        {/*<Page3 />*/}
      </div>
    )
  }
}

export default Login;
