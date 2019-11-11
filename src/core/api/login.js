import telegram from './index'

const config = {
  // NOTE: if you FORK the project you MUST use your APP ID.
  // Otherwise YOUR APPLICATION WILL BE BLOCKED BY TELEGRAM
  // You can obtain your own APP ID for your application here: https://my.telegram.org
  id  : 54413,
  hash: '2971aee0b50f8db4b71ee21bdbce38cd'
}

const login = async () => {
  try {
    // const phone = await inputField('phone')
    // console.log(phone)
    const phone = '+79274615910'
    console.log('auth.sendCode', {
            phone_number  : phone,
            current_number: false,
            api_id        : config.id,
            api_hash      : config.hash
    });
    const data = await telegram('auth.sendCode', {
      phone_number  : phone,
      api_id        : config.id,
      api_hash      : config.hash
    })
    // const data = await telegram('help.getConfig')
    console.log('login', data);
    // const code = await inputField('code')
    // const code = '22222'
    // const res = await telegram('auth.signIn', {
    //   phone_number: phone,
    //   phone_code_hash,
    //   phone_code  : code
    // })
    // const { user } = res
    // const {
    //   first_name = '',
    //   username = ''
    // } = user
    // console.log('signIn', first_name, username, user.phone)
    // return first_name
  } catch (error) {
    console.error(error)
  }
}

export default login
