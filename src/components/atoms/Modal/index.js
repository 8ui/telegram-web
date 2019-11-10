import Dom from '@dom'
import classNames from 'classnames'
import Icon from '@atoms/Icon'
import ButtonIcon from '@atoms/ButtonIcon'
import './styles.scss'

class Modal extends Dom.Component {


  render() {
    const {
      className,
      onClose,
      onSuccess,
      visible,
      children,
    } = this.props;

    return (
      <div className={classNames('modal-overlay', { 'modal-overlay--visible': visible })}>
        <div className={classNames('modal', className)}>
          <div className="modal__header">
            <ButtonIcon onClick={onClose} name="close" />
            <span className="modal__header-title">Drag to Reposition</span>
          </div>
          <div className="modal__body">
            {children}
          </div>
          <div className="modal__footer">
            <ButtonIcon
              primary
              size="l"
              name="check1"
              onClick={onSuccess}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
