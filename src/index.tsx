// tslint:disable-next-line:no-import-side-effect
import './styles/main.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store, StoreEnhancerStoreCreator } from 'redux';

import thunk from 'redux-thunk';

import { App } from './containers/app';
import { Connection } from './network/connection';
import { index, IStore } from './reducers';

const thunkableRedux: StoreEnhancerStoreCreator<IStore> = applyMiddleware(thunk)(createStore);
const container: HTMLElement = document.getElementById('chat');
const store: Store<IStore> = thunkableRedux(index);
const connection: Connection = new Connection(store);

ReactDOM.render(<Provider store={store}><App /></Provider>, container);
