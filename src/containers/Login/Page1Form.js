import Dom from '@dom'
import api from '@core/api'
import classNames from 'classnames'
import Field from '@atoms/Field'
import Button from '@atoms/Button'
import Dropdown from '@molucules/Dropdown'
import countries from '@domain/countries.json'
import FieldCheckbox from '@atoms/FieldCheckbox'

const countriesData = countries.map(n => ({
  flag: n.flag,
  code: n.code,
  name: n.name,
  placeholder: n.dial_code
}))

class Form extends Dom.Component {
  constructor(props) {
    super(props)

    this.state = {
      keepMeCheckbox: true,
      country: 'RU',
      // country: null,
      phone: this.props.phone,
      showButton: true,
      // showButton: false,
      loading: false,
    }
  }

  onChangeCountry = (value, props) => {
    this.setState({ country: value }, () => {
      // const inputContainer = this.elem.children[0].children[1].children[0];
      const input = this.elem.children[0].children[1].getElementsByTagName('input')[0];
      // inputContainer.classList.add('input--with-value');
      input.value = props.placeholder + ' ';
      this.onChange()
      setTimeout(() => input.focus())
    });
  }

  onChangePhone = ({ target: { value } }, name) => {
    const { onPhoneChange } = this.props;
    this.state.phone = value;
    onPhoneChange(value);
    this.onChange()
    // this.setState({ [name]: value })
  }

  onCheckboxChange = () => {
    this.setState(
      ({ keepMeCheckbox }) => ({
        keepMeCheckbox: !keepMeCheckbox,
      }),
      () => this.onChange()
    )
  }

  onChange = () => {
    const { country, phone, keepMeCheckbox } = this.state;
    const button = this.elem.children[1]

    if (country && phone && keepMeCheckbox) {
      this.state.showButton = true;
      button.classList.remove('button--hidden');
    } else {
      this.state.showButton = false;
      button.classList.add('button--hidden');
    }
  }

  sendRequest = async() => {
    const { goToPage } = this.props;
    try {
      this.setState({ loading: true });
      // const r = await api.sendAuthCode(this.state.phone);
      goToPage(2);
      console.log(r, 'goToPage', 2);
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      keepMeCheckbox, country, showButton, loading,
    } = this.state;
    const { phone } = this.props;
    return (
      <div>
        <div className="login-form">
          <Field>
            <Dropdown
              data={countriesData}
              value={country}
              onChange={this.onChangeCountry}
              label="Country"
            />
          </Field>
          <Field
            onKeyUp={this.onChangePhone}
            label="Phone Number"
            value={phone}
            phoneFormat={country}
          />
          <FieldCheckbox
            onChange={this.onCheckboxChange}
            checked={keepMeCheckbox}
            label="Keep me signed in"
          />
        </div>
        <Button
          className={classNames({ 'button--hidden': !showButton })}
          onClick={this.sendRequest}
          loading={loading}
        >
          next
        </Button>
      </div>
    )
  }
}



export default Form;
