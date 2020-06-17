import * as t from './actionTypes';
import {userService} from '../service/useService';
import {errorParser} from '../service/apiErrorParser';

export const loggedIn = data => ({
    type: t.AUTH_LOGGED_IN,
    payload: data,
<<<<<<< HEAD
});

export const clearLoginErrorMessage = () => ({
    type: t.AUTH_CLEAR_LOGIN_ERROR_MESSAGE
})

export const errorLogIn = errorMessage => ({
=======
  });
  
  export const clearLoginErrorMessage = () => ({
    type: t.AUTH_CLEAR_LOGIN_ERROR_MESSAGE,
  });
  
  export const errorLogIn = errorMessage => ({
>>>>>>> e1e11d734a7d09d032f96bad971f3e7dc92ac437
    type: t.AUTH_ERR_LOG_IN,
    payload: errorMessage,
  });
  
  export const loggingIn = () => ({
    type: t.AUTH_LOGGING_IN,
  });
  
  export const loggedOut = () => ({
    type: t.AUTH_LOGOUT,
  });

  export const getInfo = () => ({
    type: t.AUTH_GET_INFO,
  })

export const logout = () => async(dispatch,getState) => {
    await userService.logout(getState).then((res) => {
        dispatch(loggedOut());
    }).catch((err) => {});
};

export const login = (navigation,username, password) => (dispatch) => {
    dispatch(loggingIn());
    userService.login(username,password).then(async(res) => {
        await dispatch(loggedIn(res.result));
        navigation.navigate('Cá nhân')
    }).catch((err) => {
        dispatch(errorLogIn(errorParser.parseLoginError(err).message));
    });
};