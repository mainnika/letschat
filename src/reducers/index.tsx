'use strict';

import { combineReducers, Reducer } from 'redux';

import { Action } from '../constants/action';
import { IStore } from '../constants/store';
import { AuthReducers } from './auth';
import { ConnReducers } from './conn';

const createReducer = (): Reducer<IStore> => {

  const auth: AuthReducers = new AuthReducers();
  const conn: ConnReducers = new ConnReducers();

  return combineReducers<IStore>({
    auth: auth.reduce.bind(auth),
    conn: conn.reduce.bind(conn),
  });
};

export { createReducer };
