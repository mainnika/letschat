'use strict';

// tslint:disable-next-line:no-import-side-effect
import './styles/main.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Reducer, Store, StoreEnhancerStoreCreator } from 'redux';

import thunk from 'redux-thunk';

import { IStore } from './constants/store';
import { App } from './containers/app';
import { Connection } from './network/connection';
import { createReducer } from './reducers';

const thunkableRedux: StoreEnhancerStoreCreator<IStore> = applyMiddleware(thunk)(createStore);
const container: HTMLElement = document.getElementById('chat');
const reducer: Reducer<IStore> = createReducer();
const store: Store<IStore> = thunkableRedux(reducer);
const connection: Connection = new Connection(store);

Connection.Instance = connection;
ReactDOM.render(<Provider store={store}><App /></Provider>, container);
