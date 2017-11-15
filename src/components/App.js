import React from 'react';  
import {Link} from 'react-router-dom';
import SignupPage from '../containers/SignupContainer';
import LoginPage from '../containers/LoginContainer';
import ChatPage from '../containers/ChatContainer';
import Loading from './common/Loading';
import * as views from '../reducers/viewNames';
import {connect } from 'react-redux';

const App = (props) => {
  const launch = 'launch ';
  switch(props.view) {
    case views.LOGIN_VIEW :
      console.log(launch, 'login');
      return <LoginPage />;
    
    case views.SIGNUP_VIEW:
    console.log(launch, 'signup');
      return <SignupPage />;
    
    case views.CHAT_VIEW:
    console.log(launch, 'chat');
      return <ChatPage />;

    case views.LOADING_VIEW:
      return <Loading />;

      default:
        console.log("UNKNOWN VIEW : ", props);
  }
}

const mapStateToProps = (state) => {
  return state;
}
  export default connect(mapStateToProps)(App); 