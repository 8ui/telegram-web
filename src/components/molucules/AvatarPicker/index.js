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
    this.setState({
      image: true,
    })
    this.onClose();
  }

  renderImage = () => {
    // const { image } = this.state
    return (
      <div className="avatar-picker__image">

      </div>
    )
  }

  render() {
    const { modal, image } = this.state;
    const {
      className,
      onChange,
      onLoad,
    } = this.props;

    return (
      <div>
        <div className={classNames('avatar-picker', { 'avatar-picker--selected': image })}>
          {this.renderImage()}
          <div onClick={this.onOpen} className="avatar-picker__picker">
            <Icon name="cameraadd" />
          </div>
        </div>
        <Modal
          visible={modal}
          onClose={this.onClose}
          onSuccess={this.onSuccess}
        >
          <ImageCrop />
        </Modal>
      </div>
    )
  }
}

export default AvatarPicker;
