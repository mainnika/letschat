'use strict';

import { Action, IAction, IReceiveUserAuth } from '../constants/action';
import { IAuthStore } from '../constants/store';

interface IReduceMap<T> {
  [action: number]: (state: T, action: IAction) => T;
}

abstract class AbstractReducers<T> {

  protected abstract get defaultState(): T;
  protected abstract get reduceMap(): IReduceMap<T>;

  public reduce(state: T = this.defaultState, action: IAction): T {

    const reducer: IReduceMap<T>[0] | undefined = this.reduceMap[action.type];

    if (reducer) {
      return reducer.call(this, state, action);
    }

    return state;
  }
}

export { AbstractReducers, IReduceMap };
