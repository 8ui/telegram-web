import Dom from '@dom';
import lottie from 'lottie-web';
import './styles.scss';

class Lottie extends Dom.Component {
  componentDidMount() {
    const {
      options,
      eventListeners
    } = this.props;

    const {
      loop,
      autoplay,
      path,
      rendererSettings,
      segments
    } = options;

    this.options = {
      container: this.elem,
      renderer: 'svg',
      loop: Boolean(loop),
      autoplay: Boolean(autoplay),
      segments: Boolean(segments),
      path,
      rendererSettings
    };

    this.options = {
      ...this.options,
      ...options
    };

    this.anim = lottie.loadAnimation(this.options);
    this.registerEvents(eventListeners);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    /* Recreate the animation handle if the data is changed */
    if (
      this.options.animationData !== nextProps.options.animationData ||
      this.options.path !== nextProps.options.path
    ) {
      this.unregisterEvents(this.props.eventListeners);
      this.destroy();
      this.options = {
        ...this.options,
        ...nextProps.options
      };
      this.anim = lottie.loadAnimation(this.options);
      this.registerEvents(nextProps.eventListeners);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('Lottie.componentDidUpdate', this.props.eventListeners, this.props);
    if (this.props.isStopped) {
      this.stop();
    } else if (this.props.segments) {
      this.playSegments();
    } else {
      this.play();
    }

    //this.pause();
    this.setSpeed();
    this.setDirection();
  }

  componentWillUnmount() {
    // console.log('Lottie.componentWillUnmount', this.props.eventListeners, this.props);
    this.unregisterEvents(this.props.eventListeners);
    this.destroy();
    this.options.animationData = null;
    this.options.path = null;
    this.anim = null;
  }

  setSpeed() {
    this.anim.setSpeed(this.props.speed);
  }

  setDirection() {
    this.anim.setDirection(this.props.direction);
  }

  play() {
    this.anim.play();
  }

  playSegments() {
    this.anim.playSegments(this.props.segments);
  }

  stop() {
    this.anim.stop();
  }

  pause() {
    if (!this.anim.isPaused) {
      this.anim.pause();
      return true;
    }

    return false;
  }

  destroy() {
    this.anim.destroy();
  }

  registerEvents(eventListeners) {
    if (!this.anim) return;

    if (!eventListeners) return;

    eventListeners.forEach(({
      eventName,
      callback
    }) => {
      this.anim.addEventListener(eventName, callback);
    });
  }

  unregisterEvents(eventListeners) {
    if (!this.anim) return;

    if (!eventListeners) return;

    eventListeners.forEach(({
      eventName,
      callback
    }) => {
      this.anim.removeEventListener(eventName, callback);
    });
  }

  render() {
    const {
      width,
      height,
      ariaRole,
      ariaLabel,
      title,
      eventListeners,
      onComplete,
      onMouseEnter,
      onMouseOut,
      ...other
    } = this.props;

    const getSize = initial => {
      let size;

      if (typeof initial === 'number') {
        size = `${initial}px`;
      } else {
        size = initial || '100%';
      }

      return size;
    };

    const lottieStyles = {
      width: getSize(width),
      height: getSize(height),
      overflow: 'hidden',
      margin: '0 auto',
      outline: 'none',
      ...this.props.style
    };

    return (
      <div
        style={lottieStyles}
        title={title}
        role={ariaRole}
        aria-label={ariaLabel}
        tabIndex="0"
        {...other}
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
      />
    );
  }
}

Lottie.defaultProps = {
  eventListeners: [],
  speed: 1,
  ariaRole: 'button',
  ariaLabel: 'animation',
  title: ''
};

export default Lottie;
