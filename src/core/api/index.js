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

function databaseExists(dbname, callback) {
  var req = indexedDB.open(dbname);
  var existed = true;
  req.onsuccess = function() {
    req.result.close();
    if (!existed) indexedDB.deleteDatabase(dbname);
    callback(existed);
  };
  req.onupgradeneeded = function() {
    existed = false;
  };
}

let client;
let connected;

async function main() {
  if (client) {
    if (!connected) {
      connected = true;
      await client.connect();
    }
    return client;
  }
  try {
    client = await createClient({
      apiId: APP_ID,
      apiHash: APP_HASH,
      useDefaultVerbosityLevel: true,
      useDatabase: true,
    })

    console.warn('client', client);

    // client
    //   .on('update', update => {
    //     // console.log('Got update:', JSON.stringify(update, null, 2))
    //   })
    //   .on('error', err => {
    //     console.error('Got error:', JSON.stringify(err, null, 2))
    //   })
    //   .on('destroy', () => {
    //     console.log('destroy event')
    //   })

    client.on('update', (...props) => console.warn('UPDATE', ...props))

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

    const dbName = 'tdlib'
    databaseExists(dbName, exists => {
      client.emit('clientUpdate', { '@type': 'clientUpdateDatabaseExists', exists });
    });

    return client;
  } catch (e) {
    console.error('test dlib', e);
  }
}

export default main;
