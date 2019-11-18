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
      database_directory: '/db',
    })

    console.warn({ client });

    client.__tmp__ = Math.random()

    client.on('update', updater)

    await client.connect();
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
    console.warn('await client.connect');

    return client;
  } catch (e) {
    console.error('test dlib', e);
  }
}

const updater = (update) => {
  console.warn('update', update);
  switch (update._) {
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
