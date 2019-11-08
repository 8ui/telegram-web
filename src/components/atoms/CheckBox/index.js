import Dom from '@dom'
import Icon from '@atoms/Icon'
import './styles.scss'


class Checkbox extends Dom.Component {
  render () {
    const { ...props } = this.props;
    return (
      <div
        className={`checkbox`}
      >
        <div className="checkbox__container">
          <div className="checkbox__check">
            <Icon name="checkboxon" />
          </div>
          <div className="checkbox__label">
            Keep me signed in
          </div>
        </div>
      </div>
    )
  }
}

export default Checkbox;
