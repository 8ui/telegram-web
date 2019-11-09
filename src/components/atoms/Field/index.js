import Dom from '@dom'

import Input from '../Input'
import './styles.scss'


class Field extends Dom.Component {
  render () {
    const { children, ...props } = this.props;
    return (
      <div
        className={`field ${props.size}`}
      >
        {children || <Input {...props} />}
      </div>
    )
  }
}

Field.defaultProps = {
  size: 'm',
}

export default Field;
