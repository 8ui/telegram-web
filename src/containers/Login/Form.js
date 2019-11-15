import Dom from '@dom'
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
    }
  }

  onChange = ({ target: { value } }, name) => {
    // this.setState({ [name]: value })
  }

  onCheckboxChange = () => {
    this.setState(({ keepMeCheckbox }) => ({
      keepMeCheckbox: !keepMeCheckbox,
    }))
  }

  render() {
    const { keepMeCheckbox, phone, country } = this.state;
    // console.warn('country', country);
    return (
      <div className="login-form">
        <Field>
          <Dropdown
            data={countries}
            value={country}
            onChange={(value) => this.setState({ country: value })}
            label="Country"
          />
        </Field>
        <Field
          onChange={(e) => this.onChange(e, 'phone')}
          value={phone}
          label="Phone Number"
        />
        <FieldCheckbox
          onChange={this.onCheckboxChange}
          checked={keepMeCheckbox}
          label="Keep me signed in"
        />
      </div>
    )
  }
}



export default Form;
