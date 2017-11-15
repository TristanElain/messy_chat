import React from 'react';
import {connect} from 'react-redux';
import {sendMessage, deleteMessage, messageRecieved, messageDeleted, fetchMessages} from '../actions/index';
import ListMessages from '../components/ListMessages';

class Chat extends React.PureComponent {
    constructor(props) {
        super(props);

        this.message = "";
    }

    componentDidMount() {
        const ws = new WebSocket("wss://messy.now.sh");
        
        ws.onmessage = (message) => {

            let data = JSON.parse(message.data);
            let messages = this.props.messages;

            switch(data.event) {
                case "message.created" :
                    messageRecieved(data.message);
                    break;
                
                case "message.deleted" :                   
                    messageDeleted(data.id);
                    break;
            }
        }
    };

    componentWillMount() {
        if(this.props.messages.length === 0) {
            this.props.getMessages(this.props.user.token);
        }
    }

    render() {
        console.log('fetching :', this.props.isFetching);
        if(this.props.isFetching) {
            return <div> Loading </div>
        } else {
            return <ListMessages messages={this.props.messages} userId={this.props.user.id} 
                send={()=> {this.props.send(this.message, this.props.messages, this.props.user.token)}}
                del={(id) => this.props.del(id, this.props.user.token)} write={event => this.message=event.target.value}
                keyPressed={event => {
                    if (event.key === 'Enter') {
                        this.props.send(this.message, this.props.messages, this.props.user.token);
                     }
                }}/>
        }
    }


}
const mapStateToProps = (state, ownProps) => {
    console.log('mapState chat, ', state);
    return  state
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(ownProps);
    return {
        getMessages: (token) => dispatch(fetchMessages(token)),
        send: (message, messages, token) => dispatch(sendMessage(message, messages, token)),
        del: (id, token) => dispatch(deleteMessage(id, token)),
        messageRecieved: (message) => dispatch(messageRecieved(message)),
        messageDeleted: (id) => dispatch(messageDeleted(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);