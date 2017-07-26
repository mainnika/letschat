'use strict';

type ISignalsMap<E, K extends keyof E> = {[on in K]?: DocumentFragment};

interface ISignalListener<T> extends EventListener {
  (evt: Event, data: T): void;
}

class Signals<E, T> {

  private static readonly EVENT_TAG: string = `userSignals${Math.random()}`;

  private signals: ISignalsMap<E, keyof E>;

  public constructor() {

    this.signals = {};
  }

  public emit(event: E, data: T): void {

    const signal: DocumentFragment = this.signals[event] = this.signals[event] || document.createDocumentFragment();
    signal.dispatchEvent(new CustomEvent(Signals.EVENT_TAG, { detail: data }));
  }

  public on(event: E, cb: EventListener): void {

    const signal: DocumentFragment = this.signals[event] = this.signals[event] || document.createDocumentFragment();
    signal.addEventListener(Signals.EVENT_TAG, cb);
  }

  public once(event: E, cb: EventListener): void {

    const signal: DocumentFragment = this.signals[event] = this.signals[event] || document.createDocumentFragment();
    signal.addEventListener(Signals.EVENT_TAG, cb, { once: true });
  }
}

export { Signals };
