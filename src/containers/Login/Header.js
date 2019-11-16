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
  renderImage: () => <div className="login__logo-image" />,
  renderTitle: () => 'Sign in to Telegram',
  renderSubTitle: () => <div><span>Please confirm your country and</span><br /><span>enter your phone number.</span></div>,
}

export default Logo;
