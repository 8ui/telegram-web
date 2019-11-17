import test from './test'

// import Module from './hello'
//
// console.warn('Module', Module);

// import MTProto from 'telegram-mtproto';
// import Storage from 'mtproto-storage-browser';
// import { APP_ID, APP_HASH } from '@core/constants'
//
// const config = {
//   api_id: APP_ID,
//   api_hash: APP_HASH,
// };
//
// const api = {
//   layer: 57,
//   invokeWithLayer: 0xda9b0d0d,
//   initConnection: 0x69796de9,
//   api_id: config.api_id
// };
//
// const server = {
//   webogram: true,
//   dev: true
// };
//
// const app = {
//   storage: new Storage()
// };
//
// const publicKeys = [{
//     modulus: 'C150023E2F70DB7985DED064759CFECF0AF328E69A41DAF4D6F01B538135A6F91F8F8B2A0EC9BA9720CE352EFCF6C5680FFC424BD634864902DE0B4BD6D49F4E580230E3AE97D95C8B19442B3C0A10D8F5633FECEDD6926A7F6DAB0DDB7D457F9EA81B8465FCD6FFFEED114011DF91C059CAEDAF97625F6C96ECC74725556934EF781D866B34F011FCE4D835A090196E9A5F0E4449AF7EB697DDB9076494CA5F81104A305B6DD27665722C46B60E5DF680FB16B210607EF217652E60236C255F6A28315F4083A96791D7214BF64C1DF4FD0DB1944FB26A2A57031B32EEE64AD15A8BA68885CDE74A5BFC920F6ABF59BA5C75506373E7130F9042DA922179251F',
//     exponent: '010001'
//   }, {
//     modulus: 'AEEC36C8FFC109CB099624685B97815415657BD76D8C9C3E398103D7AD16C9BBA6F525ED0412D7AE2C2DE2B44E77D72CBF4B7438709A4E646A05C43427C7F184DEBF72947519680E651500890C6832796DD11F772C25FF8F576755AFE055B0A3752C696EB7D8DA0D8BE1FAF38C9BDD97CE0A77D3916230C4032167100EDD0F9E7A3A9B602D04367B689536AF0D64B613CCBA7962939D3B57682BEB6DAE5B608130B2E52ACA78BA023CF6CE806B1DC49C72CF928A7199D22E3D7AC84E47BC9427D0236945D10DBD15177BAB413FBF0EDFDA09F014C7A7DA088DDE9759702CA760AF2B8E4E97CC055C617BD74C3D97008635B98DC4D621B4891DA9FB0473047927',
//     exponent: '010001'
//   }, {
//     modulus: 'BDF2C77D81F6AFD47BD30F29AC76E55ADFE70E487E5E48297E5A9055C9C07D2B93B4ED3994D3ECA5098BF18D978D54F8B7C713EB10247607E69AF9EF44F38E28F8B439F257A11572945CC0406FE3F37BB92B79112DB69EEDF2DC71584A661638EA5BECB9E23585074B80D57D9F5710DD30D2DA940E0ADA2F1B878397DC1A72B5CE2531B6F7DD158E09C828D03450CA0FF8A174DEACEBCAA22DDE84EF66AD370F259D18AF806638012DA0CA4A70BAA83D9C158F3552BC9158E69BF332A45809E1C36905A5CAA12348DD57941A482131BE7B2355A5F4635374F3BD3DDF5FF925BF4809EE27C1E67D9120C5FE08A9DE458B1B4A3C5D0A428437F2BECA81F4E2D5FF',
//     exponent: '010001'
//   }, {
//     modulus: 'B3F762B739BE98F343EB1921CF0148CFA27FF7AF02B6471213FED9DAA0098976E667750324F1ABCEA4C31E43B7D11F1579133F2B3D9FE27474E462058884E5E1B123BE9CBBC6A443B2925C08520E7325E6F1A6D50E117EB61EA49D2534C8BB4D2AE4153FABE832B9EDF4C5755FDD8B19940B81D1D96CF433D19E6A22968A85DC80F0312F596BD2530C1CFB28B5FE019AC9BC25CD9C2A5D8A0F3A1C0C79BCCA524D315B5E21B5C26B46BABE3D75D06D1CD33329EC782A0F22891ED1DB42A1D6C0DEA431428BC4D7AABDCF3E0EB6FDA4E23EB7733E7727E9A1915580796C55188D2596D2665AD1182BA7ABF15AAA5A8B779EA996317A20AE044B820BFF35B6E8A1',
//     exponent: '010001'
//   }, {
//     modulus: 'BE6A71558EE577FF03023CFA17AAB4E6C86383CFF8A7AD38EDB9FAFE6F323F2D5106CBC8CAFB83B869CFFD1CCF121CD743D509E589E68765C96601E813DC5B9DFC4BE415C7A6526132D0035CA33D6D6075D4F535122A1CDFE017041F1088D1419F65C8E5490EE613E16DBF662698C0F54870F0475FA893FC41EB55B08FF1AC211BC045DED31BE27D12C96D8D3CFC6A7AE8AA50BF2EE0F30ED507CC2581E3DEC56DE94F5DC0A7ABEE0BE990B893F2887BD2C6310A1E0A9E3E38BD34FDED2541508DC102A9C9B4C95EFFD9DD2DFE96C29BE647D6C69D66CA500843CFAED6E440196F1DBE0E2E22163C61CA48C79116FA77216726749A976A1C4B0944B5121E8C01',
//     exponent: '010001'
// }]
//
// class TelegramAPIService {
//   constructor() {
//     this.client = MTProto({server, api, app, publicKeys});
//
//     this.data = {
//       phone_code_hash: null,
//     }
//   }
//
//   setData = (data) => {
//     this.data = {...this.data, ...data};
//   }
//
//   async sendAuthCode(phoneNumber) {
//     console.log('sendAuthCode', arguments);
//     const {phone_code_hash} = await this.client('auth.sendCode', {
//       phone_number: phoneNumber,
//       api_id: config.api_id,
//       api_hash: config.api_hash
//     });
//
//     this.setData({ phone_code_hash })
//     return phone_code_hash;
//   }
//
//   async signIn(phoneNumber, phoneCode, phoneCodeHash) {
//     console.log('signIn', phoneNumber, phoneCode, phoneCodeHash);
//     if (!phoneCodeHash) phoneCodeHash = this.data.phone_code_hash;
//     const {user} = await this.client('auth.signIn', {
//       phone_number: phoneNumber,
//       phone_code: phoneCode,
//       phone_code_hash: phoneCodeHash
//     });
//
//     console.log('signIn', user);
//     return user;
//   }
//
//   async logOut() {
//     console.log('logOut', arguments);
//     const isLogOutSuccessful = await this.client('auth.logOut');
//     return isLogOutSuccessful;
//   }
//
//   async getDialogs() {
//     console.log('getDialogs', arguments);
//     const dialogs = await this.client('messages.getDialogs', {limit: 20});
//
//     return dialogs;
//   }
//
//   async getHistory(userId, accessHash) {
//     console.log('getHistory', arguments);
//     const {messages} = await this.client('messages.getHistory', {
//       peer: {
//         _: 'inputPeerUser',
//         user_id: userId,
//         access_hash: accessHash
//       },
//       limit: 20
//     });
//
//     return messages;
//   }
//
//   async sendMessage(userId, accessHash, message, messageId) {
//     console.log('sendMessage', arguments);
//     const sentMessage = await this.client('messages.sendMessage', {
//       peer: {
//         _: 'inputPeerUser',
//         user_id: userId,
//         access_hash: accessHash
//       },
//       message,
//       random_id: messageId
//     });
//
//     return sentMessage;
//   }
//
//   async readHistory(userId, accessHash) {
//     console.log('readHistory', arguments);
//     const readMark = await this.client('messages.readHistory', {
//       peer: {
//         _: 'inputPeerUser',
//         user_id: userId,
//         access_hash: accessHash
//       }
//     });
//
//     return readMark;
//   }
// }
//
// const telegramAPIService = new TelegramAPIService();
//
// window.api = telegramAPIService;
//
// export default telegramAPIService;
