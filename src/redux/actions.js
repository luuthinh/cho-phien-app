import * as t from './actionTypes'
import { LoginUrl} from '../constants/API'

const setLoginState = (loginData) => {
    return {
        type: t.SET_LOGIN_STATE,
        payload: loginData,
    }
}