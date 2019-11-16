import MTProto from 'telegram-mtproto';
import Storage from 'mtproto-storage-browser';
import { APP_ID, APP_HASH } from '@core/constants'

const config = {
  api_id: APP_ID,
  api_hash: APP_HASH,
};

const api = {
  layer: 57,
  invokeWithLayer: 0xda9b0d0d,
  initConnection: 0x69796de9,
  api_id: config.api_id
};

const server = {
  webogram: true,
  dev: false
};

const app = {
  storage: new Storage()
};

class TelegramAPIService {
  constructor() {
    this.client = MTProto({server, api, app});
  }

  async sendAuthCode(phoneNumber) {
    console.log('sendAuthCode', arguments);
    const {phone_code_hash} = await this.client('auth.sendCode', {
      phone_number: phoneNumber,
      api_id: config.api_id,
      api_hash: config.api_hash
    });

    return phone_code_hash;
  }

  async signIn(phoneNumber, phoneCode, phoneCodeHash) {
    console.log('signIn', arguments);
    const {user} = await this.client('auth.signIn', {
      phone_number: phoneNumber,
      phone_code: phoneCode,
      phone_code_hash: phoneCodeHash
    });

    return user;
  }

  async logOut() {
    console.log('logOut', arguments);
    const isLogOutSuccessful = await this.client('auth.logOut');
    return isLogOutSuccessful;
  }

  async getDialogs() {
    console.log('getDialogs', arguments);
    const dialogs = await this.client('messages.getDialogs', {limit: 20});

    return dialogs;
  }

  async getHistory(userId, accessHash) {
    console.log('getHistory', arguments);
    const {messages} = await this.client('messages.getHistory', {
      peer: {
        _: 'inputPeerUser',
        user_id: userId,
        access_hash: accessHash
      },
      limit: 20
    });

    return messages;
  }

  async sendMessage(userId, accessHash, message, messageId) {
    console.log('sendMessage', arguments);
    const sentMessage = await this.client('messages.sendMessage', {
      peer: {
        _: 'inputPeerUser',
        user_id: userId,
        access_hash: accessHash
      },
      message,
      random_id: messageId
    });

    return sentMessage;
  }

  async readHistory(userId, accessHash) {
    console.log('readHistory', arguments);
    const readMark = await this.client('messages.readHistory', {
      peer: {
        _: 'inputPeerUser',
        user_id: userId,
        access_hash: accessHash
      }
    });

    return readMark;
  }
}

const telegramAPIService = new TelegramAPIService();

export default telegramAPIService;
