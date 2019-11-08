import Dom from '@dom'
import Header from './Header'
import Form from './Form'
import './styles.scss'

class Login extends Dom.Component {
  render() {
    return (
      <div className="login">
        <Header />
        <Form />
      </div>
    )
  }
}

export default Login;
