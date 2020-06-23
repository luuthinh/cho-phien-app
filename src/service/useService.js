import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {DB,URL_LOGIN, URL_LOGOUT } from '../constants/API';

async function login(username, password) {
  return new Promise((resolve, reject) => {
    fetch(URL_LOGIN, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        params:{'db':DB,'login':username,'password':password}
      })
    }).then(async(response) => { 
      await AsyncStorage.setItem('sessionID', response.headers.map["set-cookie"])
      let json = await response.json()
      json.result.session_id = response.headers.map["set-cookie"].split("; ")[0].split("=")[1]
      json.result.expires_date = response.headers.map["set-cookie"].split("; ")[1].split("=")[1]
      return json
    })
    .then(async(json) => {
        await AsyncStorage.setItem('uid', json.result.uid.toString())
        resolve(json)
    }).catch(err => reject(err));
  });
}

async function logout(getState) {
  return new Promise(async (resolve, reject) => {
    const currentState = await getState();
    const { sessionID } = currentState.auth;
    console.log(sessionID)
    fetch(URL_LOGOUT, {}, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X_Openerp": sessionID
      },
    }).then(async (response) => {
      resolve(response);
       await AsyncStorage.removeItem('uid');
       await AsyncStorage.removeItem('sessionID');
    }).catch(err => reject(err));
  });
}

export const userService = {
  login,
  logout,
};