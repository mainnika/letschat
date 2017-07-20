'use strict';

import { Action, IAction, IReceiveUserAuth } from '../constants/action';
import { IAuthStore } from '../constants/store';

import { AbstractReducers, IReduceMap } from './abstract';

class AuthReducers extends AbstractReducers<IAuthStore> {

  protected defaultState: IAuthStore = {
    user: undefined,
  };

  protected reduceMap: IReduceMap<IAuthStore> = {
    [Action.ReceiveUserAuth]: AuthReducers.prototype.reduceReceiveUserAuth,
  };

  private reduceReceiveUserAuth(state: IAuthStore, action: IReceiveUserAuth): IAuthStore {

    return { ...state, user: action.user };
  }
}

export { AuthReducers };
