import Dom, { addEventListener, removeEventListener }from '@dom'
import classNames from 'classnames'
import './styles.scss'

class ScrollView extends Dom.Component {
  constructor(props) {
    super(props);

    this.offset = 10;
    this.y = 0;
    this.scale = 0.1;
    this.oldY = 0;
    this.barTop = 0
    this.barActive = false
    this.scrollTop = 0;
    this.scrollTopOld = 0;
    this.delta = 0;
    this.barMove = false;
  }

  componentDidMount() {
    this.container = this.elem.children[0]
    this.list = this.elem.children[0].children[0]
    this.scrollBar = this.elem.children[1].children[0]

    addEventListener(this.container, 'scroll', this.onScroll);
    addEventListener(document.body, 'mouseup', this.onEndMove);
    addEventListener(document.body, 'mousemove', this.onBarMove);
    addEventListener(document.body, 'mousedown', this.onStartMove);
  }

  componentWillUnmount() {
    removeEventListener(this.container, 'scroll', this.onScroll);
    removeEventListener(document.body, 'mouseup', this.onEndMove);
    removeEventListener(document.body, 'mousemove', this.onBarMove);
    removeEventListener(document.body, 'mousedown', this.onStartMove);
  }

  getHeight = () => this.container.offsetHeight - this.offset;

  onScroll = ({ target }) => {
    if (this.barMove) return;
    this.y = target.scrollTop / (this.list.offsetHeight - this.getHeight());
    this.y = (this.y - this.scale * this.y)
    this.y = this.y < 0 ? 0 : ( (this.y + this.scale) > 1 ? 1 - this.scale : this.y )
    this.moveBar()
  }

  onBarMove = (e) => {
    if (!this.barActive) return;
    this.barMove = true;
    const delta = (this.delta - e.screenY) * -1;
    this.y = this.oldY + delta / this.getHeight();
    this.y = this.y < 0 ? 0 : ( (this.y + this.scale) > 1 ? 1 - this.scale : this.y )
    this.container.scrollTop = (this.y + this.scale * this.y) * this.list.offsetHeight
    this.moveBar();
    // console.log('delta', this.y, delta, delta / this.getHeight());
  }

  onStartMove = (e) => {
    if (e.target === this.scrollBar) {
      this.delta = e.screenY;
      this.oldY = this.y;
      this.barActive = true;
      this.barMove = true;
    }
  }

  onEndMove = (e) => {
    this.barActive = false;
    this.barMove = false;
  }

  moveBar = () => {
    this.scrollBar.style.transform = `translateY(${this.y * this.getHeight()}px)`;
    // this.scrollBar.style.height = this.getHeight() / this.list.offsetHeight * this.getHeight() + 'px';
  }

  render() {
    const { children } = this.props;

    return (
      <div className={classNames('scroll-view')}>
        <div className="scroll-view__container">
          {children}
        </div>
        <div className="scroll-view__scrollbar">
          <div className="scroll-view__scrollbar-bar" />
        </div>
      </div>
    )
  }
}

export default ScrollView;
