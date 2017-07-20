'use strict';

interface IAuthStore {
  user: string;
}

interface IConnStore {
  state: number;
}

interface IStore {
  auth: IAuthStore;
  conn: IConnStore;
}

export { IAuthStore, IConnStore, IStore };
