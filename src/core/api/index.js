import { APP_ID, APP_HASH } from '@core/constants';
import MTProto from 'telegram-mtproto'
import * as localforage from 'localforage'
import BrowserStorage from 'mtproto-storage-browser'

export const storage = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
})

const api = {
  invokeWithLayer: 0xda9b0d0d,
  layer          : 57,
  initConnection : 0x69796de9,
  api_id         : APP_ID,
  app_version    : '1.0.1',
  lang_code      : 'en'
}

const server = {
  webogram: true,
  // webogram: window && window.location && window.location.protocol === 'https:',
  dev: true
}

const app = {
  debug: false,
  storage: new BrowserStorage(storage),
}

const telegram = MTProto({
  server,
  api,
  // app,
  // schema: require('./api-tlschema.json'),
})


if (process.env.NODE_ENV === 'development') {
  window.api = telegram
}

export default telegram
