import { combineReducers } from 'redux';

import { Action } from '../configs/action';
import { authed, Iauthed } from './authed';

interface IStore {
  authed: Iauthed;
}

interface IAction {
  type: Action;
}

const index = combineReducers<IStore>({
  authed,
});

export { authed, index, IAction, IStore };
