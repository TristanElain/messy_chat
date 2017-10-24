import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 	UserForm from './components/UserForm'
import reducer from './reducers'

const store = createStore(reducer);

render(
	<Provider store={store}>
		<UserForm />
	</Provider>,
	document.getElementById("main")
)
