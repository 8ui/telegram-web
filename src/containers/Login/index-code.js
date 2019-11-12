import Dom from '@dom'
import { parseStickerData } from '@core/utils/common'
import ButtonIcon from '@atoms/ButtonIcon'
import Sticker from '@atoms/Sticker'
import Field from '@atoms/Field'
import Button from '@atoms/Button'
import Header from './Header'
import Form from './Form'
import './styles.scss'


class Login extends Dom.Component {
  constructor(props) {
    super(props)

    this.stickers = ['Close','CloseAndPeek','CloseAndPeekToIdle','Idle','Peek','Tracking'];
    this.state = {
      stickers: [],
      code: null,
    }

    // this.stickers.forEach(n => this.loadData(n))
    this.loadStickers();
  }

  loadStickers = async() => {
    const promises = []

    this.stickers.forEach(n => {
      promises.push(this.loadBlob(n));
    })

    const r = await Promise.all(promises)

    this.setState({ stickers: r })
    return r;
  }

  loadBlob = async(name) => {
    const url = `/stickers/TwoFactorSetupMonkey${name}.tgs`
    const blob = await fetch(url).then(r => r.blob());

    const data = await parseStickerData(blob);
    return data;
  }

  renderImage = () => {
    const { stickers } = this.state;

    if (stickers.length) {
      return (
        <Sticker className="login__logo-sticker" height={168} width={168} loop={false} animationData={stickers[3]} />
      )
    }

    return null;
  }

  renderTitle = () => {

    return [
      <span>+33 1 23 45 67 89</span>,
      <ButtonIcon name="edit" />
    ]
  }

  renderSubtitle = () => {
    return 'We have sent you an SMS<br /> with the code.'
  }

  render() {
    const { stickers } = this.state
    return (
      <div className="login">
        <Header
          renderImage={this.renderImage}
          renderTitle={this.renderTitle}
          renderSubTitle={this.renderSubtitle}
        />
        <div className="login-form">
          <Field
            value={this.state.code}
            error={true}
            errorLabel="Invalid Code"
            label="Code"
            onChange={(e) => this.setState({ code: e.target.value })}
            rightAddons={[
              <ButtonIcon name="eye1" />,
            ]}
          />
        </div>
        <Button>
          next
        </Button>
        {/* {stickers.map(n => <Sticker height={168} width={168} loop={true} animationData={n} />)} */}
      </div>
    )
  }
}

export default Login;
