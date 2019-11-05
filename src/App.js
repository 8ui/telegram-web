import Dom from '@dom'

import Home from './containers/Chat'

class App extends Dom.Component {
  render() {
    const data = { foo: 'bar' };
    return (
      <span>
        <h1>
          <i className="icon times"></i>
          test
          {data.foo}
          <span>2222</span> 123
          <Home />
        </h1>
        <h3>test</h3>
      </span>
    );
  }
}

export default App;
