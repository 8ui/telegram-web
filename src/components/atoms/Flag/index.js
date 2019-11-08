import Dom from '@dom'


class Flag extends Dom.Component {
  render() {
    const { name } = this.props;
    return (
      <i className={`icon icon-${name}`}></i>
    )
  }
}

export default Flag;
