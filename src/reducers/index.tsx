'use strict';

import { combineReducers, Reducer } from 'redux';

import { Action } from '../constants/action';
import { IStore } from '../constants/store';
import { AuthReducers } from './auth';

const createReducer = (): Reducer<IStore> => {

  const auth: AuthReducers = new AuthReducers();

  return combineReducers<IStore>({
    auth: auth.reduce.bind(auth),
  });
};

export { createReducer };
