'use strict';

enum Action {
  ReceiveUserAuth,
  ConnectionChanged,
}

interface IAction {
  type: Action;
}

interface IReceiveUserAuth extends IAction {
  user: string;
}

interface IConnectionChanged extends IAction {
  newState: number;
}

export {
  Action,
  IAction,
  IReceiveUserAuth,
  IConnectionChanged,
};
