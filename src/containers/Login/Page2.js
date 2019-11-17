import Dom from '@dom'
import api from '@core/api'
import { parseStickerData } from '@core/utils/common'
import ButtonIcon from '@atoms/ButtonIcon'
import Sticker from '@atoms/Sticker'
import Field from '@atoms/Field'
import Button from '@atoms/Button'
import { sleep } from '@core/utils/common'
import Header from './Header'
import './styles.scss'


class Page2 extends Dom.Component {
  constructor(props) {
    super(props)

    this.pageStates = {
      enterCode: {
        pageState: 0, // inter code
        activeSticker: 3,  // open idle
      },
      enterCodeError: {
        codeError: true,
        pageState: 0, // inter code error
        activeSticker: 5, // passwd track
      },
      enterPwd: {
        pageState: 1, // enter passwd
        activeSticker: 4, // passwd peek
      },
      enterPwdError: {
        passwdError: true,
        pageState: 1, // enter passwd
      },
      enterPwdVisible: {
        pageState: 1, // enter passwd
        activeSticker: 2, // passwd peek
      },
      // enterPwdVisible: {
      //   pageState: 1, // enter passwd
      //   activeSticker: 2, // passwd peek
      // },
    }

    this.stickers = ['Close','CloseAndPeek','CloseAndPeekToIdle','Idle','Peek','Tracking'];
    this.state = {
      stickers: [],
      activeSticker: 3,
      loading: false,
      code: null,
      passwd: null,
      codeError: false,
      passwdError: false,
      ...this.pageStates.enterCode,
    }

    this.loadStickers();
  }

  setPageState = (name, update = true) => {
    const params = {
      ...this.pageStates[name],
    };

    if (update) this.setState(params);
    return params;
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

  checkCode = (code) => {
    // TODO: simple check
    return true;
  }

  onCodeChange = ({ target: { value } }) => {
    this.setStateW({ code: value })
    if (this.checkCode(value)) this.sendCodeRequest();
  }

  sendCodeRequest = async() => {
    const { loading, code } = this.state;
    const { goToPage, phone } = this.props;

    if (loading) return;
    let state = {}
    try {
      this.setState({ loading: true });
      const client = await api();

      await client.invoke({
        '@type': 'checkAuthenticationCode',
        code: code,
        first_name: 'A',
        last_name: 'B'
      })
      // goToPage(3);
      await sleep(600);
      state = { ...state, ...this.setPageState('enterPwd', false) };
    } catch (e) {
      console.error(e);
      state = { ...state, ...this.setPageState('enterCodeError', false) };
    }
    this.setState({ loading: false, ...state });
  }

  sendPasswdRequest = async() => {
    const { loading, code } = this.state;
    const { goToPage, phone } = this.props;

    if (loading) return;
    let state = {}
    try {
      this.setState({ loading: true });
      // const r = await api.signIn(phone, code);
      await sleep(600);
      return goToPage(3);
    } catch (e) {
      console.error(e);
      state = { ...state, ...this.setPageState('enterPwdError', false) };
    }
    this.setState({ loading: false, ...state });
  }

  onTogglePasswdVisible = (active) => {
    let name = active ? 'enterPwdVisible' : 'enterPwd';
    this.setPageState(name);
  }

  renderImage = () => {
    const { stickers, activeSticker } = this.state;
    if (stickers[activeSticker]) {
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
    const { pageState } = this.state
    const { phone, goToPage } = this.props;
    return (
      <div>
        <div>
          {pageState === 0 && (
            <div>
              <span>{phone}</span>
              <ButtonIcon onClick={() => goToPage(1)} name="edit" />
            </div>
          )}
        </div>
        <div>
          {pageState === 1 && (
            <div>Enter a Password</div>
          )}
        </div>
      </div>
    )
  }

  renderSubtitle = () => {
    const { pageState } = this.state
    return (
      <div>
        {pageState === 0 && <div><span>We have sent you an SMS</span><br /><span>with the code.</span></div>}
        {pageState === 1 && <div><span>Your account is protected with</span><br /><span>an additional password.</span></div>}
      </div>
    )
  }

  renderEnterCode = () => {
    const {
      pageState, code, codeError, loading,
    } = this.state;

    if (pageState !== 0) return null;

    return (
      <Field
        focus
        value={code}
        loading={loading}
        error={codeError}
        errorLabel="Invalid Code"
        label="Code"
        onChange={this.onCodeChange}
      />
    )
  }

  renderEnterPasswd = () => {
    const {
      pageState, passwd, passwdError, loading,
    } = this.state;

    if (pageState !== 1) return null;
    console.warn('loading', loading);
    return (
      <div className="login-passwd">
        <Field
          focus
          value={passwd}
          error={passwdError}
          errorLabel="Invalid Password"
          label="Password"
          input={{ type: 'password' }}
          onChange={(e) => this.setStateW({ passwd: e.target.value })}
          onTogglePasswdVisible={this.onTogglePasswdVisible}
        />
        <Button
          loading={loading}
          onClick={this.sendPasswdRequest}
        >
          NEXT
        </Button>
      </div>
    )
  }

  render() {
    const { stickers, code, error, loading } = this.state
    return (
      <div>
        <Header
          renderImage={this.renderImage}
          renderTitle={this.renderTitle}
          renderSubTitle={this.renderSubtitle}
        />
        <div className="login-form">
          <div>{this.renderEnterCode()}</div>
          <div>{this.renderEnterPasswd()}</div>
        </div>
        {/*stickers.map((n, i) => (
          <Button onClick={() => this.setState({ activeSticker: i })}>{n.nm}</Button>
        ))*/}
      </div>
    )
  }
}

export default Page2;
