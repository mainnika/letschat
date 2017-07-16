// tslint:disable:no-import-side-effect

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './containers/app';

import './styles/main.scss';

const container: HTMLElement = document.getElementById('chat');

ReactDOM.render(<App />, container);
