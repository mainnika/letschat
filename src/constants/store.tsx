'use strict';

interface IAuthStore {
  user: string;
}

interface IStore {
  auth: IAuthStore;
}

export { IAuthStore, IStore };
