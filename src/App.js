import Dom from '@dom'
import api from '@core/api';
// import storage from '@core/storage';
import './styles/index.scss'

import Login from './containers/Login/index'

// import Login from './containers/Login/index-user'

// const setPhoneNumber = phone => {
//   TdLibController.send({
//       '@type': 'setAuthenticationPhoneNumber',
//       phone_number: phone
//     })
//     .then(result => {
//       TdLibController.clientUpdate({
//         '@type': 'clientUpdateSetPhoneResult',
//         result
//       });
//     })
//     .catch(error => {
//       console.log('!phone error');
//       TdLibController.clientUpdate({
//         '@type': 'clientUpdateSetPhoneError',
//         error
//       });
//     });
// };
//
// const onUpdate = update => {
//   console.log('onUpdate', update);
//   switch (update['@type']) {
//     case 'updateAuthorizationState':
//       {
//         switch (update.authorization_state['@type']) {
//           case 'authorizationStateWaitTdlibParameters':
//             TdLibController.sendTdParameters();
//             break;
//           case 'authorizationStateWaitEncryptionKey':
//             TdLibController.send({
//               '@type': 'checkDatabaseEncryptionKey'
//             });
//             break;
//           case 'authorizationStateWaitPhoneNumber':
//             setPhoneNumber('+79274615910');
//             break;
//           default:
//         }
//       }
//     default:
//   }
// }

// const init = () => {
//   TdLibController.init();
//   TdLibController.addListener('update', onUpdate);
//
//   // setTimeout(() => {
//   //   TdLibController.clientUpdate({
//   //       '@type': 'clientUpdateSetPhone',
//   //       phone: '+79274615910'
//   //   });
//   // }, 2000)
// }
//
// init();


class App extends Dom.Component {
  constructor(props) {
    super(props)
    this.init();
  }

  async init() {
    // const client = await api();
    // const data = await client.invoke({
    //   _: 'auth.sendCode',
    //   phone_number: '+79274615910',
    // });
    // console.warn('data', data);
  }

  render() {
    return (
      <Login />
    );
  }
}

export default App;
