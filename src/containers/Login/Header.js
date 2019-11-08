import Dom from '@dom'

class Logo extends Dom.Component {
  render() {
    return (
      <div className="login__header">
        <div className="login__logo">
          <div className="login__logo__image" />
        </div>
        <div className="login__header__title">
          Sign in to Telegram
        </div>
        <div className="login__header__subtitle">
          Please confirm your country and<br /> enter your phone number.
        </div>
      </div>
    )
  }
}

export default Logo;
