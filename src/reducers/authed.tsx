import { Action } from '../configs/action';
import { IAction } from './index';

interface Iauthed {
  user?: string;
}

const initState: Iauthed = {
  user: undefined,
};

const authed = (state: Iauthed = initState, action: IAction & Iauthed): Iauthed => {
  switch (action.type) {
    case Action.ReceiveUserAuth:
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export { authed, Iauthed };
