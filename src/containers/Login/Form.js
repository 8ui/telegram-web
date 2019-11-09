import Dom from '@dom'
import Field from '@atoms/Field'
import Dropdown from '@molucules/Dropdown'
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
    return (
      <div className="login-form">
        <Field>
          <Dropdown
            data={[
              { value: 'ru', icon: 'car', text: 'Afghanistan', placeholder: '+93' },
              { value: 'ru', icon: 'car', text: 'Albania', placeholder: '+355' },
              { value: 'ru', icon: 'car', text: 'Algeria', placeholder: '+213' },
              { value: 'ru', icon: 'car', text: 'American Samoa', placeholder: '+1684' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
              { value: 'ru', icon: 'car', text: 'Russia', placeholder: '+7' },
            ]}
            value={country}
            onChange={console.log}
            placeholder="Country"
          />
        </Field>
        <Field
          onChange={(e) => this.onChange(e, 'phone')}
          value={phone}
          placeholder="Phone Number"
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
