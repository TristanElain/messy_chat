import * as actions from '../actions/actionTypes';
import * as views from './viewNames';
import chatReducers from './chatReducers';

const initialState = {
    view: views.LOGIN_VIEW,
    user: {
        token: "",
        id: "",
    },
    messages: [],
    isError: false,
    error: {},
    isFetching: false
};



function chatApp(state = initialState, action = {type: 'init'}) {
    Object.assign({}, state, {lastAction: action.type});
    switch(action.type){
        case actions.REQUEST_LOGIN :
            return Object.assign({}, state, {isFetching: true, error: {}, isError: false});
        
        case actions.REQUEST_ERROR:
            return Object.assign({}, state, {
                isError: true,
                error: action.payload.error
            });

        case actions.LOGIN_SUCCEEDED:
            console.log("LOGIN SUCCEDED");
            return Object.assign({}, state, {
                user: {
                    token: action.payload.token,
                    id: action.payload.id
                }
            });

        case actions.REQUEST_SIGNUP:
            return Object.assign({}, state, {isFetching: true, error: {}, isError: false});

        case actions.SIGNUP_SUCCEEDED :
            return Object.assign({}, state, {
                view: views.LOGIN_VIEW,
                justSigned: true
            });

        case actions.CHANGE_VIEW:
            return Object.assign({}, state, {view: action.payload.view});

        case actions.REQUEST_MESSAGES:
        case actions.RECIEVE_MESSAGES:
        case actions.SENDING_MESSSAGE : 
                return chatReducers(state, action);
        default:

         if(state.token) {
             return Object.assign({}, state, {
                 view: views.CHAT_VIEW,

             });
         }
         return state;
    }
}


export default chatApp;