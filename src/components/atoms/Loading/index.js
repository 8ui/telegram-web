import Dom from '@dom'
import classNames from 'classnames';
import './styles.scss'


const Loading = ({ inverted }) => (
  <div className={classNames('loading', { 'loading--inverted': inverted })} />
)

export default Loading;
