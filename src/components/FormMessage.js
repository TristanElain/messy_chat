var React = require("react");

function FormMessage(props) {
    return (
        <div id="formMessage">
             <textarea id="message" rows="4" cols="50" onInput={props.write}></textarea>
             <button onClick={props.send}>send</button>
        </div>
    );
}

module.exports = FormMessage;