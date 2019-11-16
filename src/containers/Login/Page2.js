import Dom from '@dom'
import { parseStickerData } from '@core/utils/common'
import ButtonIcon from '@atoms/ButtonIcon'
import Sticker from '@atoms/Sticker'
import Field from '@atoms/Field'
import Button from '@atoms/Button'
import Header from './Header'
import './styles.scss'


class Page2 extends Dom.Component {
  constructor(props) {
    super(props)

    this.stickers = ['Close','CloseAndPeek','CloseAndPeekToIdle','Idle','Peek','Tracking'];
    this.state = {
      stickers: [],
      activeSticker: 3,
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

    console.log(promises);

    const r = await Promise.all(promises)
    console.log(r);
    this.setState({ stickers: r }, () => {
      console.log(r);
    })
    return r;
  }

  loadBlob = async(name) => {
    const url = `/stickers/TwoFactorSetupMonkey${name}.tgs`
    const blob = await fetch(url).then(r => r.blob());

    const data = await parseStickerData(blob);
    console.log('data', data);
    return data;
  }

  renderImage = () => {
    const { stickers, activeSticker } = this.state;
    console.warn('renderImage', activeSticker, stickers);
    if (activeSticker) {
      return (
        <Sticker
          className="login__logo-sticker"
          height={168}
          width={168}
          loop={false}
          animationData={stickers[activeSticker]}
        />
      )
    }

    return null;
  }

  renderTitle = () => {

    return (
      <div>
        <span>+33 1 23 45 67 89</span>
        <ButtonIcon name="edit" />
      </div>
    )
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
        <Button onClick={() => this.setState({ activeSticker: 2 })}>
          next
        </Button>
        {/* {stickers.map(n => <Sticker height={168} width={168} loop={true} animationData={n} />)} */}
      </div>
    )
  }
}

export default Page2;
