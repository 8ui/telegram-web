import Dom from '@dom'
import api from '@core/api'
import Field from '@atoms/Field'
import Button from '@atoms/Button'
import Dropdown from '@molucules/Dropdown'
import countries from '@domain/countries.json'
import FieldCheckbox from '@atoms/FieldCheckbox'

class Form extends Dom.Component {
  constructor(props) {
    super(props)

    this.state = {
      keepMeCheckbox: true,
      country: null,
      phone: null,
      showButton: false,
    }
  }

  onChangeCountry = (value, props) => {
    this.setState({ country: value }, () => {
      // const inputContainer = this.elem.children[0].children[1].children[0];
      const input = this.elem.children[0].children[1].getElementsByTagName('input')[0];
      // inputContainer.classList.add('input--with-value');
      input.value = props.dial_code + ' ';
      input.focus();
      this.onChange()
    });
  }

  onChangePhone = ({ target: { value } }, name) => {
    this.state.phone = value;
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
      button.classList.add('button--hidden');
    }
  }

  goNextPage = async() => {
    const r = await api.sendAuthCode(this.state.phone);
    console.log('r', r);
  }

  render() {
    const {
      keepMeCheckbox, phone, country, showButton,
    } = this.state;

    return (
      <div>
        <div className="login-form">
          <Field>
            <Dropdown
              data={countries}
              value={country}
              onChange={this.onChangeCountry}
              label="Country"
            />
          </Field>
          <Field
            onChange={this.onChangePhone}
            value={phone}
            label="Phone Number"
            phone={country}
          />
          <FieldCheckbox
            onChange={this.onCheckboxChange}
            checked={keepMeCheckbox}
            label="Keep me signed in"
          />
        </div>
        <Button
          className="button--hidden"
          onClick={this.goNextPage}
        >
          next
        </Button>
      </div>
    )
  }
}



export default Form;
