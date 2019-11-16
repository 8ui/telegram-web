import Dom from '@dom'
import Header from './Header'
import Form from './Page1Form'
import Button from '@atoms/Button'
import './styles.scss'

class Page1 extends Dom.Component {
  render() {
    const { goToPage, onPhoneChange, phone } = this.props;
    return (
      <div>
        <Header />
        <Form
          phone={phone}
          goToPage={() => goToPage(2)}
          onPhoneChange={onPhoneChange}
        />
      </div>
    )
  }
}

export default Page1;
