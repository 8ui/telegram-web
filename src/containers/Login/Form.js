import Dom from '@dom'
import Field from '@atoms/Field'
import CheckBox from '@atoms/CheckBox'

class Form extends Dom.Component {
  render() {
    return (
      <div className="login-form">
        <Field placeholder="Country" />
        <Field placeholder="Phone Number" />
        <CheckBox />
      </div>
    )
  }
}

export default Form;
