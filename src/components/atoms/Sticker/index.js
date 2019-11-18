import Dom from '@dom'
import Lottie from '@atoms/Lottie'

class Sticker extends Dom.Component {
  componentDidMount() {
    // console.log('sticker', this.elem);
  }

  render() {
    const {
      autoplay, animationData, loop, ...props
    } = this.props;

    return (
      <div>
        <Lottie
          options = {{
            autoplay,
            loop,
            animationData,
            renderer: 'svg',
            rendererSettings: {
              preserveAspectRatio: 'xMinYMin slice',
              clearCanvas: false,
              progressiveLoad: true,
              hideOnTransparent: true,
              className: 'lottie-svg'
            }
          }}
          {...props}
        />
      </div>
    )
  }
}
// eventListeners = {[{
//   eventName: 'loopComplete',
//   callback: this.handleAnimationLoopComplete
// }]}
// onMouseOut = {this.handleAnimationMouseOut}

Sticker.defaultProps = {
  autoplay: true,
  loop: true,
}

export default Sticker;
