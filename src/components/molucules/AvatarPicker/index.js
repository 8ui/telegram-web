import Dom from '@dom'
import classNames from 'classnames'
import Icon from '@atoms/Icon'
import './styles.scss'

class AvatarPicker extends Dom.Component {
  renderImage = () => {
    return (
      <div className="avatar-picker__image">
        <img src="" />
      </div>
    )
  }

  render() {
    const {
      className,
      onChange,
      onLoad,
    } = this.props;

    return (
      <div className="avatar-picker">
        {this.renderImage()}
        <div className="avatar-picker__picker">
          <Icon name="cameraadd" />
        </div>
      </div>
    )
  }
}

export default AvatarPicker;
