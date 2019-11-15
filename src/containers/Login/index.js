import Dom from '@dom'
import Button from '@atoms/Button'
import Header from './Header'
import Form from './Form'
import './styles.scss'

class Login extends Dom.Component {
  state = {
    show: true,
  }

  render() {
    const { show } = this.state;
    return (
      <div className="login">
        <Header />
        {show && (
          <Form />
        )}

        {/* <Button>
          prev
        </Button> */}

        <Button onClick={() => this.setState(({ show }) => ({ show: !show }))}>
          next
        </Button>
      </div>
    )
  }
}

export default Login;
