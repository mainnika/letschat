'use strict';

import * as Promise from 'bluebird';

class Waiter<T> {

  private created: number;
  private expired: boolean;
  private id: string;

  private promise: Promise<T>;
  private rejecter: (reason: {}) => void;
  private resolver: (value: T) => void;

  public constructor(id: string) {

    this.id = id;
    this.expired = false;
    this.created = Date.now();
    this.promise = new Promise((resolve: (value?: T | PromiseLike<T>) => void, reject: (reason: {}) => void): void => {
      this.resolver = resolve;
      this.rejecter = reject;
    });
  }

  public get Created(): number {

    return this.created;
  }

  public get Pending(): boolean {

    return !this.expired;
  }

  public get Id(): string {

    return this.id;
  }

  public get Promise(): Promise<T> {

    return this.promise;
  }

  public reject(message: string): void {

    if (this.expired) {
      return;
    }

    this.expired = true;
    this.rejecter(new Error(message));
  }

  public resolve(message: T): void {

    if (this.expired) {
      return;
    }

    this.expired = true;
    this.resolver(message);
  }
}

export { Waiter };
