const crypto = require('crypto')

//CONFIG
const PUBLIC_KEY = process.env.API_key_PUBLIC
const PRIVATE_KEY = process.env.API_key_PRIVATE
const API_VERSION = process.env.API_VERSION

export default function ({ $moment, $auth, $axios, redirect }, inject ) {

  $axios.onRequest(config => {

    const METHOD = config.method.toUpperCase();
    const URI = "/" + API_VERSION + config.url;
    const DATETIME = new Date().toISOString();

    const CONCAT = METHOD + URI + DATETIME;
    const API_SIGN = crypto.createHmac('sha1', PRIVATE_KEY).update(CONCAT, "utf-8").digest('hex');

    config.headers["x-public-key"] = PUBLIC_KEY;
    config.headers["x-datetime"] = DATETIME;
    config.headers["x-signature"] = API_SIGN;
  });

  $axios.onResponseError(error => {
    if(error.response.status === 401) {
      if(!error.response.config.url === "/sessions"){
        $auth.logout()
        return redirect('/')
      }
    }
  });

}
