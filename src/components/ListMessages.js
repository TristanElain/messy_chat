var React = require("react");

function ListMessages(props) {
    let messages = props.messages.sort((m1, m2) => {return m2.date.localeCompare(m1.date)});

    return (
        <div className="container" style={{marginTop: 15+'px'}}>
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="panel-title">Chat</div>
                        </div>
                        <div id="panel-body-chat" className="panel-body" style={{height: 400+'px'}}>
                            <ul className="chat">
                                {messages.map((message, i) => {
                                    let liClassName, spanClassName, strongClassName, smallClassName, pClassName;
                                    if(props.userId === message.user_id) {
                                        liClassName = "right clearfix";
                                        spanClassName = "chat-img pull-right";
                                        strongClassName = "pull-right primary-font";
                                        smallClassName = "text-muted";
                                        pClassName = "pull-right"
                                    }
                                    else {
                                        liClassName = "left clearfix";
                                        spanClassName = "chat-img pull-left";
                                        strongClassName = "primary-font";
                                        smallClassName = "pull-right text-muted";
                                    }
                                     
                                    return (
                                        <li className={liClassName} key={i}>
                                            <span className={spanClassName}>
                                            <img src={message.user.image} alt={message.user.name} height="42" width="42" className="img-circle" />
                                            </span>
                                            <div className="chat-body clearfix">
                                                <div className="header">
                                                    <strong className={strongClassName}>{message.user.name}</strong> <small className={smallClassName}>
                                                    <span className="glyphicon glyphicon-time"></span>{message.date}   </small>
                                                    {(props.userId === message.user_id) ? 
                                                    <i className="glyphicon glyphicon-remove" onClick={() => props.del(message.id)}></i> : ""}
                                                </div>
                                                <p className={pClassName}>{message.message}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="panel-footer">
                            <div className="input-group">
                                <input id="btn-input-chat" type="text" className="form-control input-sm" onInput={props.write}
                                     onKeyPress={props.keyPressed} placeholder="Type your message here..." />
                                <span className="input-group-btn">
                                <button className="btn btn-warning btn-sm" onClick={props.send} id="btn-chat">Send</button>
                                </span>
                            </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
        
    );
}

module.exports = ListMessages;