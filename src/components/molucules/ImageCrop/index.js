import Dom from '@dom'
import classNames from 'classnames'
import './styles.scss'

class ImageCrop extends Dom.Component {
  render() {
    const { children } = this.props;

    return (
      <div className={classNames('image-crop')}>
        <div className="image-crop__container">
          <div className="image-crop__container-overlay"></div>
        </div>
        <div className="image-crop__circular">
        </div>
      </div>
    )
  }
}

export default ImageCrop;
