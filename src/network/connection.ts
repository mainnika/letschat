
import { applyMiddleware, createStore, Store, StoreEnhancerStoreCreator } from 'redux';

import { IStore } from '../constants/store';

class Connection {

  private ws: WebSocket;
  private store: Store<IStore>;

  public constructor(store: Store<IStore>) {

    this.store = store;
    this.store.subscribe(this.storeListener.bind(this));
  }

  private storeListener(): void {
    //
  }
}

export { Connection };
