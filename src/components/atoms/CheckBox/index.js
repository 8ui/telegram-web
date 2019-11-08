import Dom from '@dom'
import Icon from '@atoms/Icon'
import './styles.scss'


const Checkbox = ({ checked }) => (
  <div className={`checkbox${checked ? ' checkbox--checked' : ''}`}>
    <Icon name={`checkbox${checked ? 'on' : 'empty'}`} />
  </div>
)

Checkbox.defaultProps = {
}

export default Checkbox;
