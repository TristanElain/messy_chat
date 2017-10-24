const jwt = require("jsonwebtoken");

const REQUEST_MESSAGES = "FETCH_MESSAGES";
const RECIEVE_MESSAGES = "RECIEVE_MESSAGES";
const MESSAGE_RECIEVED = "RECIEVE_MESSAGE";
const SEND_MESSAGE = "SEND_MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";
const MESSAGE_DELETED = "MESSAGE_DELETED"
const REQUEST_LOGIN = "REQUEST_LOGIN";
const LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED";
const LOGIN_DECLINED = "LOGIN_DECLINED";
const ASK_SIGNUP = 'ASK_SIGNUP';
const SIGNUP_DECLINED = "SIGNUP_DECLINED";
const SIGNUP = "SIGNUP"; 


function initFetch(method, body) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    return { method: method,
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    body: body }
}

function fetchMessages (){
   return{
        type: FETCH_MESSAGES,
        payload: {}
   }
};

function sendMessage(message) {
    return {
        type: SEND_MESSAGE,
        payload: {message: message}
    }
};

function deleteMessage(id)  {
    return {
        type: DELETE_MESSAGE,
        payload: {id: id}
    }
};

function requestLogin(user) {
    return {
        typ: REQUEST_LOGIN,
        payload : user
    }
};

function loginDeclined(error) {
    return {
        type: LOGIN_DECLINED,
        payload: {
            error
        }
    }
};

function loginSucceeded(token) {
    return {
        type: LOGIN_SUCCEEDED,
        payload: {
            token: token,
            id: jwt.decode(token)
        }
    }
}

function disconnect() {
    return {
        type: DISCONNECT,
        payload: {}
    }
}

function askLogin(user) {
    return dispatch => {
        dispatch(requestLogin(user));
        return fetch("https://messy.now.sh/authenticate", initFetch('POST', JSON.stringify(user)))
                .then(response => response.json())
                .then(json => {
                    if(json.error) {
                        dispatch(loginDeclined(json.error));
                    } else {
                        sessionStorage.setItem("token", json.token);
                        dispatch(loginSucceeded(json.token));
                    }
                })
    }
};

function askDisconnect() {
    sessionStorage.removeItem("token");
    return dispatch => dispatch(disconnect);

}


const signin;