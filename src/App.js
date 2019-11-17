import Dom from '@dom'
import classNames from 'classnames';
import api from '@core/api';
import './styles/index.scss'

import Chat from './containers/Chat/index'
import Login from './containers/Login/index'


class App extends Dom.Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: false,
    }
  }

  async componentWillMount() {
    console.warn('componentWillMount');
    const client = await api();

    client.on('update', this.updater);
  }

  async componentDidUnmount() {
    const client = await api();

    client.removeListener('update', this.updater);
  }

  updater = (update) => {
    switch (updater._) {
      case 'updateAuthorizationState': {
        switch (update.authorization_state._) {
          case 'authorizationStateReady':
            this.setState({ auth: true });
            console.warn('!!!!authorizationStateReady!!!!');
            break;
          default:
        }
      }
    }
  }

  render() {
    const { auth } = this.state;
    return (
      <div>
        <div className={classNames("main-container", { 'main-container--hidden': auth })}>{!auth && <Login />}</div>
        <div className={classNames("main-container", { 'main-container--hidden': !auth })}>{auth && <Chat />}</div>
      </div>
    );
  }
}

export default App;
