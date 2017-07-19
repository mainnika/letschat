import { Dispatch } from 'redux';

import { Action } from '../configs/action';

class AuthActions {

  public static initAuth = () => ({
    type: Action.ReceiveUserAuth,
    user: 'foobar✌',
  })
}

export { AuthActions };
