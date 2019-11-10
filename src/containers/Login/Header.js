import Dom from '@dom'

class Logo extends Dom.Component {
  render() {
    const { renderImage, renderTitle, renderSubTitle } = this.props;
    return (
      <div className="login__header">
        <div className="login__logo">
          {renderImage()}
        </div>
        <div className="login__header__title">
          {renderTitle()}
        </div>
        <div className="login__header__subtitle">
          {renderSubTitle()}
        </div>
      </div>
    )
  }
}

Logo.defaultProps = {
  renderTitle: () => 'Sign in to Telegram',
  renderImage: () => <div className="login__logo-image" />,
  renderSubTitle: () => 'Please confirm your country and<br /> enter your phone number.',
}

export default Logo;
