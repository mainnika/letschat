'use strict';

import { Action, IAction, IConnectionChanged } from '../constants/action';
import { IConnStore } from '../constants/store';

import { AbstractReducers, IReduceMap } from './abstract';

class ConnReducers extends AbstractReducers<IConnStore> {

  protected defaultState: IConnStore = {
    state: undefined,
  };

  protected reduceMap: IReduceMap<IConnStore> = {
    [Action.ConnectionChanged]: ConnReducers.prototype.reduceConnectionChanged,
  };

  private reduceConnectionChanged(state: IConnStore, action: IConnectionChanged): IConnStore {

    return { ...state, state: action.newState };
  }
}

export { ConnReducers };
