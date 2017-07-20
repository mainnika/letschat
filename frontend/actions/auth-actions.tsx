'use strict';

import { Dispatch } from 'redux';

import { Action, IReceiveUserAuth } from '../constants/action';

class AuthActions {

  public static initAuth = (): IReceiveUserAuth => ({
    type: Action.ReceiveUserAuth,
    user: 'foobar✌',
  })
}

export { AuthActions };
