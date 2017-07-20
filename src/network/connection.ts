
import { applyMiddleware, createStore, Store, StoreEnhancerStoreCreator } from 'redux';

import { ConnActions } from '../actions/conn-actions';
import { IStore } from '../constants/store';

class Connection {

  private ws: WebSocket;
  private store: Store<IStore>;

  public constructor(store: Store<IStore>) {

    this.store = store;
    this.store.subscribe(this.storeListener.bind(this));
    this.store.dispatch(ConnActions.changeState(WebSocket.CONNECTING));

    try {
      this.ws = new WebSocket('ws://proxy.mainnika.ru');
      this.ws.addEventListener('open', this.onOpen.bind(this));
      this.ws.addEventListener('close', this.onClose.bind(this));
      this.ws.addEventListener('error', this.onError.bind(this));
      this.ws.addEventListener('message', this.onMessage.bind(this));
    } catch (e) {
      this.store.dispatch(ConnActions.changeState(WebSocket.CLOSED));
    }
  }

  private onOpen(e: Event): void {

    this.store.dispatch(ConnActions.changeState(WebSocket.OPEN));
  }

  private onError(e: ErrorEvent): void {

    console.error('Connection::onError', e);
    this.store.dispatch(ConnActions.changeState(WebSocket.CLOSED));
  }

  private onClose(e: CloseEvent): void {

    this.store.dispatch(ConnActions.changeState(WebSocket.CLOSED));
  }

  private onMessage(e: MessageEvent): void {
    //
  }

  private storeListener(): void {
    //
  }
}

export { Connection };
