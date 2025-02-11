import Dom from '@dom'
import Icon from '@atoms/Icon'
import './styles.scss'


class Checkbox extends Dom.Component {
  render() {
    const { checked } = this.props;
    // console.log('Checkbox', checked);
    return (
      <div
        className={`checkbox${checked ? ' checkbox--checked' : ''}`}
      >
        <Icon
          name={`checkbox${checked ? 'on' : 'empty'}`}
        />
      </div>
    )
  }
}

Checkbox.defaultProps = {
}

export default Checkbox;
