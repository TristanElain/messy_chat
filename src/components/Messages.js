var React = require("react");
var FormMessage = require("./FormMessage");
var ListMessages = require("./ListMessages");
class Messages extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
            token: props.token,
            userId: props.userId,
            message: ''
        };
        

        this.getAllMessages = this.getAllMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.delMessage = this.delMessage.bind(this);
        this.error = props.error;
    }

    componentDidMount() {
        const ws = new WebSocket("wss://messy.now.sh");
        
        ws.onmessage = (message) => {

            let data = JSON.parse(message.data);
            let messages = this.state.messages;

            switch(data.event) {
                case "message.created" :
                    messages.push(data.message);
                    this.setState({messages: messages});
                    break;
                
                case "message.deleted" :                   
                    this.setState({
                        messages: messages.filter(message => {
                            return message.id !== data.id
                            })
                        }); 
                    break;
            }
        };
    }

    getAllMessages() {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer:'+this.state.token);

		let myInit = { method: 'GET',
		headers: myHeaders,
		mode: 'cors',
		cache: 'default'
	    };
        fetch("https://messy.now.sh/u/timeline", myInit)
		  .then(function(response) {
			return response.json();	
	   	  })
		  .then(json => {
              if(json.error) {
                  this.error(json.error);
              }
              this.setState({messages: json});
            })
		  .catch(error => window.alert(error));
	
    }

    sendMessage() {
        if(!this.state.message) {
            return;
        }
        // On vide le textArea
        let chatText = document.getElementById("btn-input-chat");
        chatText.value = "";

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer:'+this.state.token);

		let myInit = { method: 'POST',
		headers: myHeaders,
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify({message:this.state.message})
	 };
        this.setState({message: ""});
        fetch("https://messy.now.sh/u/timeline", myInit)
        .then(function(response) {
			return response.json();	
	   	  })
		  .then(json => {
              if(json.error) {
                  this.error(json.error);
              }
            })
		  .catch(error => window.alert(error));
    }

    delMessage(messageId) {
        console.log(messageId);
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer:'+this.state.token);

		let myInit = { method: 'DELETE',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
	    };

		fetch("https://messy.now.sh/u/timeline/"+messageId, myInit)
		  .catch(error => window.alert(error));
    }

    
    
    render() {
        if(this.state.messages) {
            //setInterval(this.getAllMessages, 1500);
            return (
            <div>
                <ListMessages messages={this.state.messages} userId={this.state.userId} del={this.delMessage.bind(this)}
                    write={event => this.setState({message: event.target.value})} send={this.sendMessage.bind(this)}
                    keyPressed={(event) => {
                                         if (event.key === 'Enter') {
                                            this.sendMessage();
                                            }
                                         }}/>
            </div>
            );
        }
        this.getAllMessages();
        return (<div>Chargement des messages</div>);
    }
}

module.exports = Messages;