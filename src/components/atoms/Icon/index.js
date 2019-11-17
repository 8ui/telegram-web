import Dom from '@dom'


const Icon = ({ name, ...props }) => (
  <i {...props} className={`icon icon-${name}`}></i>
)

export default Icon;
