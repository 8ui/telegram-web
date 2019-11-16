import Dom from '@dom'
import Header from './Header'
import Form from './Page1Form'
import Button from '@atoms/Button'
import './styles.scss'

class Page1 extends Dom.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
      </div>
    )
  }
}

export default Page1;
