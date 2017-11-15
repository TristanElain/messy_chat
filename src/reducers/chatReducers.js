import * as actions from '../actions/actionTypes';
import * as views from './viewNames';

export default (state, action) => {
    switch(action.type) {
        case actions.REQUEST_MESSAGES:
        return Object.assign({}, state, {isFetching: true});

    case actions.RECIEVE_MESSAGES:
        return Object.assign({}, state, {
            isFetching: false,
            messages: action.payload.messages});
    case actions.MESSAGE_SENT : 
            return Object.assign({}, state, {messages: action.payload.messages});
    }
}