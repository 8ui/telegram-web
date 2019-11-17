import Dom from '@dom'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import './styles.scss'

class Login extends Dom.Component {
  state = {
    page: 1,
    // phone: '+7 900 327 06 61',
    phone: '+7 927 461 59 10',
    // phone: null,
  }

  onPhoneChange = (phone) => {
    this.state.phone = phone
  }

  goToPage = page => {
    console.log('goToPage', page);
    this.setState({ page });
  }

  renderSignInPage = () => {
    const { page, phone } = this.state;

    if (page === 1) {
      return (
        <Page1
          onPhoneChange={this.onPhoneChange}
          goToPage={this.goToPage}
          phone={phone}
        />
      )
    }
    return null;
  }

  renderCodePage = () => {
    const { page, phone } = this.state;

    if (page === 2) {
      return (
        <Page2
          goToPage={this.goToPage}
          phone={phone}
        />
      )
    }
    return null;
  }

  renderProfilePage = () => {
    const { page, phone } = this.state;

    if (page === 3) {
      return (
        <Page3
          goToPage={this.goToPage}
          phone={phone}
        />
      )
    }
    return null;
  }

  render() {
    const { page, phone } = this.state;
    return (
      <div className="login">
        <div>
          {this.renderSignInPage()}
        </div>
        <div>
          {this.renderCodePage()}
        </div>
        <div>
          {this.renderProfilePage()}
        </div>
      </div>
    )
  }
}

export default Login;
