import Dom from '@dom'
import Lottie from '@atoms/Lottie'

class Sticker extends Dom.Component {
  componentDidMount() {
    console.log('sticker', this.elem);
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
              preserveAspectRatio: 'xMinYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
              clearCanvas: false,
              progressiveLoad: true, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
              hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
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
