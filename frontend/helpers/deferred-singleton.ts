'use strict';

import { reject, resolve } from 'bluebird';

interface IDeferred<T extends IDeferred<T>> {
  WhenInitiated: Promise<T>;
}

class DeferredSingleton<T extends IDeferred<T>> {

  private err: {};
  private initialized: boolean;
  private instance: T;

  public constructor(deferred: T) {

    this.instance = deferred;

    this.instance.WhenInitiated
      .then(() => this.initialized = true)
      .catch((err: {}) => this.err = err);
  }

  public get IsInitialized(): boolean {

    return this.initialized;
  }

  public get IsRejected(): boolean {

    return !!this.err;
  }

  public get Instantly(): Promise<T> {

    return resolve<T>(this.instance);
  }

  public get When(): Promise<T> {

    if (this.initialized) {
      return resolve<T>(this.instance);
    }

    if (this.err) {
      return reject<T>(this.err);
    }

    return this.instance.WhenInitiated;
  }
}

export { IDeferred, DeferredSingleton };
