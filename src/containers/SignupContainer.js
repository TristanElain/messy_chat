import {connect} from 'react-redux';
import {askSignup, changeView} from '../actions/index';
import {LOGIN_VIEW} from '../reducers/viewNames';
import Signup from '../components/SignUpForm';

const user = {
    name: "",
    password: "",
    image: ""
};
    
const mapStateToProps = (state, ownProps) => {return {}};

const mapDispatchToProps = (dispatch, ownProps) => ({
    signup: () => {dispatch(askSignup(user))},
    toLogin: () => {dispatch(changeView(LOGIN_VIEW))},
    change: (event) => {user[event.target.name] = event.target.value}
});
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Signup) ;


