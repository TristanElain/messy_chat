var React = require("react");
    function LoginForm(props) {
        return (
        <div id="loginForm" style={{marginTop: 50+'px'}} className="mainbox col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2">
            <div className="panel panel-info" >
                <div className="panel-heading">
                    <div className="panel-title">Login</div>
                </div>

                <div style={{paddingTop:30+"px"}} className="panel-body" >
                    <div style={{marginBottom: 25+'px'}} className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                            <input id="username" type="text" className="form-control" name="name" 
                                value={props.user.name} placeholder="username" onInput={props.change}/>                                        
                     </div>

                     <div style={{marginBottom: 25+'px'}} className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                            <input id="password" type="password" className="form-control" name="password"
                                value={props.user.password} placeholder="password" onInput={props.change}/>
                    </div>

                    <div className="input-group">
                        <div style={{marginTop:10+"px"}} className="form-group">
                            <div style = {{marginBottom: 5+'px'}} className="col-sm-12 controls">
                                <a id="send" href="#" className="btn btn-success" onClick={props.login}>Login</a>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12 control">
                            <div style={{borderTop: '1px solid#888', paddingTop:15+"px", fontSize:85+"%"}} >
                                Don't have an account!<a id="signup" href="#" onClick={props.signup}> Sign Up Here</a>
                            </div>
                        </div>
                    </div>    
                </div>
                
            </div>           
        </div>
        );
    }

module.exports = LoginForm;