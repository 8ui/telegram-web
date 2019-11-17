const { Client } = require('tdl')
const { TDLib } = require('tdl-tdlib-wasm')
import { APP_ID, APP_HASH } from '@core/constants'


console.warn('Module', Module);

function createClient (options) {
  return new Promise(resolve => {
    console.warn('createClient', options);
    Module()
      .then(module => {
        const tdlib = new TDLib(module)
        resolve(new Client(tdlib, options))
      })
  })
}


// Works at least in TDLib v1.3.0

async function main() {
  const client = await createClient({
    apiId: APP_ID,
    apiHash: APP_HASH,
    useDefaultVerbosityLevel: true,
  })

  client.on('error', console.error)

  await client.connect()

  const proxy = await client.invoke({
    _: 'setProxy',
    type: {
      proxy: 'proxySocks5',
      server_: '88.99.124.114',
      port_: '54801',
      username_: 'ae9c72247d0',
      password_: 'olTXpUcHgFoaUta04',
    }
  })

  console.log('Proxy:', proxy)

  // await client.login();

  await client.login(() => ({
    getPhoneNumber: retry => retry
      ? Promise.reject('Invalid phone number')
      : Promise.resolve('+9996620001'),
    getAuthCode: retry => retry
      ? Promise.reject('Invalid auth code')
      : Promise.resolve('22222'),
    getPassword: (passwordHint, retry) => retry
      ? Promise.reject('Invalid password')
      : Promise.resolve('abcdef'),
    getName: () =>
      Promise.resolve({ firstName: 'John', lastName: 'Doe' })
  }));

  // ...
}

main()
