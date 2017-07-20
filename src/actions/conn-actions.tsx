'use strict';

import { Dispatch } from 'redux';

import { Action, IConnectionChanged } from '../constants/action';

class ConnActions {

  public static changeState = (newState: number): IConnectionChanged => ({
    newState,
    type: Action.ConnectionChanged,
  })
}

export { ConnActions };
