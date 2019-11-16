import Dom from '@dom'
import { parseStickerData } from '@core/utils/common'
import ButtonIcon from '@atoms/ButtonIcon'
import AvatarPicker from '@molucules/AvatarPicker'
import Field from '@atoms/Field'
import Button from '@atoms/Button'
import Header from './Header'
import './styles.scss'


class Page3 extends Dom.Component {
  renderImage = () => {
    return (
      <AvatarPicker
        onLoad={console.log}
        onChange={console.log}
        pic={undefined}
      />
    )
  }

  renderTitle = () => {
    return 'Your Name'
  }

  renderSubtitle = () => {
    return 'Enter your name and add<br />a profile picture'
  }

  render() {
    return (
      <div className="login">
        <Header
          renderImage={this.renderImage}
          renderTitle={this.renderTitle}
          renderSubTitle={this.renderSubtitle}
        />
        <div className="login-form">
          <Field
            value=""
            label="Name"
          />
          <Field
            value=""
            label="Last Name (optional)"
          />
        </div>

        <Button>
          start messaging
        </Button>
      </div>
    )
  }
}

export default Page3;
