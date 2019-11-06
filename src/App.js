import Dom from '@dom'
import './styles/index.scss'

import Home from './containers/Chat'

class App extends Dom.Component {
  render() {
    return (
      <Home />
    );
  }
}

export default App;
