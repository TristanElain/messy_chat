

var React = require("react");
var ReactDOM = require("react-dom");
var SignUpForm = require("./components/SignUpForm");
var LoginForm = require("./components/LoginForm");
var Messages = require("./components/Messages");
var jwt = require("jsonwebtoken");
var Alert = require("react-bootstrap/lib/Alert");

class UserForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			signup: false,
			user: {
				name: "",
				image: "",
				password: ""
			},
			alert : {show: false},
			token: sessionStorage.getItem("token"),
			
		};
		this.login = this.login.bind(this);
		this.signup = this.signup.bind(this);
		this.setProperty = this.setProperty.bind(this);
		this.disconnect = this.disconnect.bind(this);
        this.error = this.error.bind(this);

	}

	error(errorObj) {
		let firstBracket = errorObj.indexOf('[');
		console.log(firstBracket);
		let error = (firstBracket !== -1) ? errorObj.substring(firstBracket+1, errorObj.length -1) : errorObj;
		throw new Error(error);
	}


	signup() {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		let myInit = { method: 'POST',
		headers: myHeaders,
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify(this.state.user)
	 };

		fetch("https://messy.now.sh/join", myInit)
		  .then(function(response) {
			return response.json();
			 })
			 .then(json => {
				 if(json.error) {
					 this.error(json.error)
				 }
				})
		  .catch(error => this.setState({alert: {show: true, error: error.message}}));
	}

	
	login() {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		let user = { name: this.state.user.name, password: this.state.user.password};
		
		let myInit = { method: 'POST',
					   headers: myHeaders,
					   mode: 'cors',
					   cache: 'default',
					   body: JSON.stringify(user)
					};

		fetch("https://messy.now.sh/authenticate", myInit)
		  .then(function(response) {
			console.log(response.status);
			return response.json();	
	   	  })
		  .then(json => {
			  if(json.error) {
				this.error(json.error);
			  }
			  sessionStorage.setItem("token", json.token);
			  this.setState({token: json.token});
		  })
		  .catch(error => window.alert(error));	
	}

	disconnect() {
		sessionStorage.clear();
		this.setState({token:'', user: {
			name: "",
			image: "",
			password: ""
		}});
	}

	setProperty(event) {
		let user = this.state.user;
		user[event.target.name] = event.target.value;
		this.setState({user: user});
	}


	render() {
        
		if(!sessionStorage.getItem("token")){
			if(this.state.signup) {
				return (
					<div className="filer">
						<SignUpForm user={this.state.user} sign={this.signup.bind(this)} 
						  change={this.setProperty.bind(this)} login={() => this.setState({signup :false})}/>
						
					</div>
				);
			}
			return (
				<div className="filer">
					<LoginForm user={this.state.user} login={this.login.bind(this)}
					 change={this.setProperty.bind(this)} signup={() => this.setState({signup :true})}/>
				</div>
			);
		}
	
		
		return (
			<div>
			<nav className="navbar navbar-default" style={{backgroundColor:'#337ab7', color:'black'}}>
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" style={{color:"white"}}href="#" onClick={this.disconnect}>
							Déconnexion
						</a>
					</div>
				</div>
			</nav>
			<Messages token={this.state.token} userId={jwt.decode(this.state.token).id} error={this.error.bind(this)}/>
			</div>
		);
		

	}

}


ReactDOM.render(<UserForm/>, document.getElementById("main"));
