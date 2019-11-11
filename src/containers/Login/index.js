import Dom from '@dom'
import Button from '@atoms/Button'
import Header from './Header'
import Form from './Form'
import './styles.scss'

class Login extends Dom.Component {
  render() {
    return (
      <div className="login">
        <Header />
        <Form />

        <Button>
          next
        </Button>
      </div>
    )
  }
}

export default Login;
