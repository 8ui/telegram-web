import Dom from '@dom'


class Icon extends Dom.Component {
  render() {
    const { name } = this.props;
    return (
      <i className={`icon icon-${name}`}></i>
    )
  }
}

export default Icon;
