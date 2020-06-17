import { initialState} from './initialState';
import * as t from './actionTypes';

export default function (state = initialState, action) {
    switch (action.type){
        case t.AUTH_LOGOUT:
            return {
                ...initialState,
            };
        case t.AUTH_CLEAR_LOGIN_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: '',
            };
        case t.AUTH_LOGGING_IN:
            return {
                ...state,
                loggingIn:true,
            };
        case t.AUTH_LOGGED_IN:
            return {
                ...state,
                name: action.payload.name,
                userName: action.payload.username,
                uid: action.payload.uid,
                sessionID: action.payload.session_id,
                expiresDate: action.payload.expires_date,
                loggingIn: false,
            };
        case t.AUTH_ERR_LOG_IN:
            return {
                ...state,
                loggingIn: false,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
}