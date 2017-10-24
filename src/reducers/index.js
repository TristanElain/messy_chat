import {
    REQUEST_LOGIN,
    LOGIN_SUCCEEDED,
    LOGIN_DECLINED
} from '../actions'

const LOGIN_VIEW = "LOGIN_VIEW";
const SIGNUP_VIEW = "SIGNUP_VIEW";
const CHAT_VIEW = "CHAT_VIEW";

const initialState = {
    view: LOGIN_VIEW,
    user: {
        token: "",
        id: "",
    },
    isError: false,
    error: {},
    isFetching: false
};


function chatApp(state = initialState, action) {
    switch(action.type){
        case REQUEST_LOGIN :
            return Object.assign({}, state, {isFetching: true});
        
        case LOGIN_DECLINED:
            return Object.assign({}, state, {
                isError: true,
                error: action.payload.error
            });

        case LOGIN_SUCCEEDED:
            return Object.assign({}, state, {
                view: CHAT_VIEW,
                user: {
                    token: action.payload.token,
                    id: action.payload.id
                }
            })
        default:
         return state;
    }
}


export default chatApp;