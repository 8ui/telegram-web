import Dom from '@dom'

class Home extends Dom.Component {
  state = {
    foo: 'bar'
  }

  onClick = (e) => {
    console.log(this.state);
    e.preventDefault()
  }

  render() {
    const data = { foo: 'bar' };
    return (
      <h2 onClick={this.onClick}>
        PRESS {data.foo}
      </h2>
    )
  }
}

export default Home;
