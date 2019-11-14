import Dom, { renderDom } from '@dom';
import App from './App'

renderDom('root', <App />);

if (module.hot) {
  module.hot.accept('./App.js', function() {
    console.log('Accepting the updated printMe module!');
    renderDom('root', App);
  });
}
