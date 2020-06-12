import * as t from './actionTypes';
import {userService} from '../service/useService';
import {errorParser} from '../service/apiErrorParser';

export const loggedIn = data => ({
    type: t.AUTH_LOGGED_IN,
    payload: data,
  });
  
  export const clearLoginErrorMessage = () => ({
    type: t.AUTH_CLEAR_LOGIN_ERROR_MESSAGE,
  });
  
  export const errorLogIn = errorMessage => ({
    type: t.AUTH_ERR_LOG_IN,
    payload: errorMessage,
  });
  
  export const loggingIn = () => ({
    type: t.AUTH_LOGGING_IN,
  });
  
  export const loggedOut = () => ({
    type: t.AUTH_LOGOUT,
  });

export const logout = () => async(dispatch,getState) => {
    await userService.logout(getState).then((res) => {
        dispatch(loggedOut());
    }).catch((err) => {});
};

export const login = (username, password) => (dispatch) => {
    dispatch(loggingIn());
    userService.login(username,password).then(async(res) => {
        console.log("in actions")
        console.log(res.result)
        await dispatch(loggedIn(res.result));
    }).catch((err) => {
        dispatch(errorLogIn(errorParser.parseLoginError(err).message));
    });
};