import * as types from './actionTypes';
import * as views from '../reducers/viewNames'
const jwt = require("jsonwebtoken");

const initFetch = ({method, body, authorization}) => {
    let headers =  {'Content-Type': 'application/json'};
    if(authorization) {
        headers = Object.assign({}, headers, authorization)
    }
    let init = { method,
    headers,
    mode: 'cors',
    cache: 'default',
    }

    if(body) {
       init = Object.assign({}, init, {body: JSON.stringify(body)})
    }

    return init;

}

export const changeView = (view) => {
    return {
        type: types.CHANGE_VIEW,
        payload: {view}
    }
};

export const messageSent = (messages) => {
    return {
        type: types.MESSAGE_SENT,
        payload: {messages}
    }
};

export const sendMessage = (message, allMessages, token) => {
    return dispatch => {
        fetch("https://messy.now.sh/u/timeline", initFetch({method: 'POST', authorization: {'Authorization': 'Bearer:'+token}, body: {message}}))
            .then(response => response.json)
            .then(json => {
                if(json.error){
                    dispatch(requestError(json.error));
                }
                else {
                    allMessages.push(message);
                    dispatch(messageSent(allMessages));
                }
            });
    }
};

export const deleteMessage = (id) => {
    return {
        type: types.DELETE_MESSAGE,
        payload: {id}
    }
};

export const requestLogin = (user) => {
    return {
        type: types.REQUEST_LOGIN,
        payload : {user}
    }
};

export const requestError = (error) => {
    return {
        type: types.REQUEST_ERROR,
        payload: {
            error
        }
    }
};


export const loginSucceeded = (token) => {
    return {
        type: types.LOGIN_SUCCEEDED,
        payload: {
            token: token,
            id: jwt.decode(token).id
        }
    }
}

export const disconnect = () => {
    return {
        type: types.DISCONNECT,
        payload: {}
    }
}

export const askLogin = (user) => {
    return dispatch => {
        console.log("ASK Login");
        dispatch(requestLogin(user));
        return fetch("https://messy.now.sh/authenticate", initFetch({method:'POST', body: user}))
                .then(response => response.json())
                .then(json => {
                    if(json.error) {
                        dispatch(requestError(json.error));
                    } else {
                        console.log("Login ok !");
                        sessionStorage.setItem("token", json.token);
                        dispatch(loginSucceeded(json.token))
                        //dispatch(fetchMessages(json.token));
                        dispatch(changeView(views.CHAT_VIEW));
                    }
                })
    }
};

export const askDisconnect = () => {
    sessionStorage.removeItem("token");
    return dispatch => dispatch(disconnect);

}

export const askSignup = (user) => {
    return dispatch => {
        dispatch(requestSignup(user));
        return fetch("https://messy.now.sh/join", initFetch({method:'POST', body: user}))
            .then(response => response.json())
            .then(json => {
                console.log("Response : ", json);
                if(json.error) {
                    dispatch(requestError(json.error));
                } else {
                    sessionStorage.setItem("token", json.token);
                    return dispatch(signupSucceeded(json.token));
                }
            })
    }
};


export const requestSignup = (user) => {
    return {
        type: types.REQUEST_SIGNUP,
        payload: user
    }
}

export const signupSucceeded = (token) => {
    return {
        type: types.SIGNUP_SUCCEEDED,
        payload: {
            token,
            id: jwt.decode(token).id
        }
    }
};

export const signupDeclined = (error) => {
    return {
        type: types.SIGNUP_DECLINED,
        payload: error
    }
};


export const messageRecieved = (message) => {
    return {
        type: types.MESSAGE_RECIEVED,
        payload: {message}
    }
};

export const messageDeleted = (id) => {
    return {
        type: types.MESSAGE_DELETED,
        payload: {id}
    }
};

export const fetchMessages = (token) => {
    console.log("fetch messages");
    return dispatch => {
        return fetch("https://messy.now.sh/u/timeline", initFetch({method: 'GET', authorization: {'Authorization': 'Bearer:'+token}}))
            .then(function(response) {
                return response.json();	
            })
            .then(json => {
                if(json.error) {
                    dispatch(requestError(json.error));
                }
                else {
                    dispatch(recieveMessages(json));
                }
            })
            .catch(error => window.alert(error));
    }
 };


 const requestMessages = () => {
    return{
        type: types.REQUEST_MESSAGES,
        payload: {}
   }
 }

 const recieveMessages = (messages) => {
     return {
         type: types.RECIEVE_MESSAGES,
         payload: {messages}
     }
 }