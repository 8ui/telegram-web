import { Client } from 'tdl'
import { TDLib } from 'tdl-tdlib-wasm'
import { APP_ID, APP_HASH } from '@core/constants'


function createClient(options) {
  return new Promise(resolve => {
    Module()
      .then(module => {
        const tdlib = new TDLib(module)
        resolve(new Client(tdlib, options))
      })
  })
}

let client;
let inited;

async function main() {
  if (!client && inited) {
    return new Promise((resolve) => {
      var interval;
      interval = setInterval(() => {
        if (client) {
          clearInterval(interval);
          resolve(client);
        }
      }, 50)
    })
  }
  else if (client) return client;
  try {
    inited = true;
    client = await createClient({
      apiId: APP_ID,
      apiHash: APP_HASH,
      useDefaultVerbosityLevel: true,
      useDatabase: true,
    })

    console.warn({ client });

    client
      .on('error', err => {
        console.error('Got error:', JSON.stringify(err, null, 2))
      })

    client.on('update', updater)

    client.on('clientUpdate', (...props) => console.warn('CLIENT_UPDATE', ...props))

    // await client.connectAndLogin(() => ({
    //   getPhoneNumber: retry => Promise.resolve(window.prompt(retry
    //     ? 'Invalid phone number, please re-enter:'
    //     : 'Please enter phone number:')),
    //   getAuthCode: retry => Promise.resolve(window.prompt(retry
    //     ? 'Wrong auth code, please re-enter:'
    //     : 'Please enter auth code:')),
    //   getPassword: (passwordHint, retry) => Promise.resolve(window.prompt(retry
    //     ? 'Wrong password, please re-enter:'
    //     : `Please enter password (${passwordHint}):`)),
    //   getName: () => {
    //     throw new Error('not supported')
    //   }
    // }))

    // const result = await client.invoke({
    //   _: 'getChats',
    //   offset_order: '9223372036854775807',
    //   offset_chat_id: 0,
    //   limit: 100
    // })

  // latest 100 chats will be returned
  // console.log('RESULT', result)

    // const proxy = await client.invoke({
    //   _: 'setProxy',
    //   type: {
    //     proxy: 'proxySocks5',
    //     server_: '88.99.124.114',
    //     port_: '54801',
    //     username_: 'ae9c72247d0',
    //     password_: 'olTXpUcHgFoaUta04',
    //   }
    // })
    // console.warn('898_PROXY_PROXY:', proxy)

    await client.connect();

    return client;
  } catch (e) {
    console.error('test dlib', e);
  }
}

const updater = (update) => {
  console.log('update', update);
  switch (update._) {
    // case 'updateUser': {
    //   window.user = update.user
    // }
    case 'updateAuthorizationState': {
      switch (update.authorization_state._) {
        case 'authorizationStateWaitTdlibParameters':
          break;
        case 'authorizationStateWaitEncryptionKey':
          console.error('checkDatabaseEncryptionKey');
          client.invoke({ '@type': 'checkDatabaseEncryptionKey' });
          break;
        default:
      }
      break;
    }
    default:
  }
}

export default main;
