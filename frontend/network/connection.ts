'use strict';

import * as Promise from 'bluebird';

import { Client, JsonRpcMessage, Method, Server, Utils } from 'jayson';
import { applyMiddleware, createStore, Store, StoreEnhancerStoreCreator } from 'redux';

import { IPacket, Packet, Validated } from 'common/packets';

import { ConnActions } from '../actions/conn-actions';
import { IStore } from '../constants/store';
import { Cache } from '../helpers/cache';
import { DeferredSingleton, IDeferred } from '../helpers/deferred-singleton';
import { Signals } from '../helpers/signals';
import { Waiter } from '../helpers/waiter';
import { WaitersQueue } from '../helpers/waiters-queue';

class Connection extends Client implements IDeferred<Connection> {

  private static _instance: DeferredSingleton<Connection>;

  private init: Promise<Connection>;

  private ws: WebSocket;
  private store: Store<IStore>;
  private methods: Cache<Method>;
  private queue: WaitersQueue<JsonRpcMessage>;
  private srv: Server;

  public constructor(store: Store<IStore>) {

    super();

    this.store = store;
    this.methods = new Cache<Method>();
    this.queue = new WaitersQueue<JsonRpcMessage>();

    this.store.subscribe(this.storeListener.bind(this));
    this.store.dispatch(ConnActions.changeState(WebSocket.CONNECTING));

    this.srv = new Server({}, {
      router: this.onRoute.bind(this),
    });

    this.init = new Promise((resolve: (instance: Connection) => void, reject: (err: {}) => void): void => {

      try {
        this.ws = new WebSocket('ws://game-woa.tokarch.uk/socket/websocket');
        this.ws.addEventListener('open', this.onOpen.bind(this));
        this.ws.addEventListener('open', resolve.bind(this, this));
        this.ws.addEventListener('close', this.onClose.bind(this));
        this.ws.addEventListener('close', reject.bind(this, 'close'));
        this.ws.addEventListener('error', this.onError.bind(this));
        this.ws.addEventListener('error', reject.bind(this, 'error'));
        this.ws.addEventListener('message', this.onMessage.bind(this));
      } catch (err) {
        this.store.dispatch(ConnActions.changeState(WebSocket.CLOSED));
        console.error('error when initialize websockets, ', err);
        reject('error when initialize websockets');
      }
    });
  }

  public get WhenInitiated(): Promise<Connection> {

    return this.init;
  }

  public static set Instance(value: Connection) {

    Connection._instance = new DeferredSingleton(value);
  }

  public static get Deferred(): DeferredSingleton<Connection> {

    return Connection._instance;
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

    Promise.promisify(Utils.JSON.parse)(e.data, {})
      .then((obj: JsonRpcMessage): void | Promise<void> => {

        if (obj.method !== undefined) {
          return this.onAsk(obj);
        }

        if (obj.id && (obj.result || obj.error)) {
          return this.onReply(obj);
        }

        return Promise.reject('either method or result required');
      })
      .catch((err: {}) => {

        console.error('can\'t parse incoming message, ', err);
      });
  }

  private storeListener(): void {
    //
  }

  public send
    <Request, Reply>(
    packet: Packet<Request, Reply>,
    data: Request,
    replyPacket: Packet<Reply, {}> | void = packet.Reply,
  ): Promise<Reply> {

    try {
      packet.validate(data);
    } catch (invalidated) {
      console.error('can\'t validate outcoming message, ', invalidated);

      return Promise.reject(invalidated);
    }

    if (!replyPacket) {
      // tslint:disable-next-line:no-null-keyword
      this.request(packet.Id, data, null, (err: {}): void => {

        if (!err) {
          return;
        }

        console.error('can\'t send message, ', err);
      });

      return Promise.resolve(undefined);
    }

    return new Promise((resolve: (reply: Reply) => void, reject: (err: {}) => void): void =>
      this.request(packet.Id, data, (err: {}, reply: Reply): void => {

        if (err) {
          console.error('can\'t send message, ', err);
          reject(err);

          return;
        }

        try {
          replyPacket.validate(reply);
          resolve(reply);
        } catch (invalidated) {
          console.error('can\'t validate reply to outcoming message, ', invalidated);
          reject(invalidated);
        }
      }));
  }

  public subscribe
    <Request, Reply>(
    packet: Packet<Request, Reply>,
    handler: (data: Request) => Promise<Reply | void>,
    replyPacket: Packet<Reply, {}> | void = packet.Reply,
  ): void {

    this.methods.push(packet.Id, new Method((data: Request, callback: (err: {} | void, data?: Reply) => void): void => {

      try {
        packet.validate(data);
      } catch (invalidated) {
        console.error('can\'t validate incoming message, ', invalidated);

        return;
      }

      if (!replyPacket) {
        handler(data);

        return;
      }

      handler(data)
        .then((reply: Reply): void | Promise<void> => {

          try {
            replyPacket.validate(reply);
          } catch (invalidated) {
            console.error('can\'t validate reply to incoming message, ', invalidated);

            return Promise.reject(invalidated);
          }

          // tslint:disable-next-line:no-null-keyword
          callback(null, reply);
        })
        .catch(callback);
    }));
  }

  // tslint:disable-next-line:no-unused-variable
  private _request(request: JsonRpcMessage, callback: (err: {}, result?: {}) => void): void {

    Promise.promisify(Utils.JSON.stringify)(request, {})
      .then((stringifiedReq: string): JsonRpcMessage | Promise<JsonRpcMessage> => {

        const waiter: Waiter<JsonRpcMessage> = this.queue.create(request.id);
        this.ws.send(stringifiedReq);

        return waiter.Promise;
      })
      .then((reply: JsonRpcMessage): void => {

        // tslint:disable-next-line:no-null-keyword
        callback(null, reply.result);
      })
      .catch(callback);
  }

  private onAsk(ask: JsonRpcMessage): void {

    Promise.promisify<JsonRpcMessage, JsonRpcMessage>(this.srv.call, { context: this.srv })(ask)
      .then((response: JsonRpcMessage): string | Promise<string> => {

        if (!response) {
          return;
        }

        return Promise.promisify(Utils.JSON.stringify)(response, {});
      })
      .then((stringified: string): void => {

        this.ws.send(stringified);
      })
      .catch((err: {}): string | Promise<string> => {

        console.error('can\'t send reply, ', err);

        return Promise.promisify(Utils.JSON.stringify)(err, {});
      })
      .then((stringified: string): void => this.ws.send(stringified))
      .catch((err: {}): void => {

        console.error('websocket i/o error, ', err);
      });
  }

  private onReply(reply: JsonRpcMessage): void {

    const id: string = reply.id;
    const waiter: Waiter<JsonRpcMessage> = this.queue.find(id);

    if (!waiter) {

      return;
    }

    if (reply.error) {
      waiter.reject(reply.error.message || reply.error.code || reply.error);

      return;
    }

    waiter.resolve(reply);
  }

  private onRoute(method: string, params: {}): Method | undefined {

    const cached: Method = this.methods.find(method);

    if (cached) {
      return cached;
    }

    return undefined;
  }
}

export { Connection };
