import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as views from '../reducers/viewNames';
import {askLogin, changeView } from '../actions/index';
import LoginForm from '../components/LoginForm';

const user = {
	name: "",
	password: ""
};
const mapStateToProps = (state, ownProps) => {return {}};

const mapDispatchToProps = (dispatch, ownProps) => ({
    login: () => {dispatch(askLogin(user))},
    toSignup: () => {dispatch(changeView(views.SIGNUP_VIEW))},
    change: (event) => {user[event.target.name] = event.target.value}
});
  


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);