'use strict';

enum Action {
  ReceiveUserAuth,
}

interface IAction {
  type: Action;
}

interface IReceiveUserAuth extends IAction {
  user: string;
}

export {
  Action,
  IAction,
  IReceiveUserAuth,
};
