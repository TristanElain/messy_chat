import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers'
import routes from './routes';
import App from './components/App';

const reducers = reducer;

const store = createStore(reducers,
applyMiddleware(thunkMiddleware));

const unsubscribe = store.subscribe(() =>
	console.log(store.getState())
);


render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("main")
)
