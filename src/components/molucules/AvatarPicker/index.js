import Dom from '@dom'
import classNames from 'classnames'
import Icon from '@atoms/Icon'
import Modal from '@atoms/Modal'
import ImageCrop from '@molucules/ImageCrop'
import './styles.scss'

class AvatarPicker extends Dom.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    }
  }

  onOpen = () => this.setState({ modal: true })

  onClose = () => this.setState({ modal: false })

  onSuccess = () => {
    console.log('success');
    this.onClose();
  }

  renderImage = () => {
    return (
      <div className="avatar-picker__image">
        <img src="" />
      </div>
    )
  }

  render() {
    const { modal } = this.state;
    const {
      className,
      onChange,
      onLoad,
    } = this.props;

    return [
      <div className="avatar-picker">
        {this.renderImage()}
        <div onClick={this.onOpen} className="avatar-picker__picker">
          <Icon name="cameraadd" />
        </div>
      </div>,
      <Modal
        visible={modal}
        onClose={this.onClose}
        onSuccess={this.onSuccess}
      >
        <ImageCrop />
      </Modal>
    ]
  }
}

export default AvatarPicker;
