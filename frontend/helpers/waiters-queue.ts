import { Waiter } from './waiter';

class WaitersQueue<T> {

  public static readonly DEFAULT_TIME_TO_WAIT: number = 10000000;

  private timeToWait: number;
  private waiters: Waiter<T>[];

  public constructor(timeToWait?: number) {

    this.waiters = [];
    this.timeToWait = timeToWait || WaitersQueue.DEFAULT_TIME_TO_WAIT;
  }

  public create(id: string): Waiter<T> {

    const waiter: Waiter<T> = new Waiter<T>(id);
    this.waiters.push(waiter);

    return waiter;
  }

  public find(id: string): Waiter<T> {

    const expirationTime: number = Date.now() - this.timeToWait;
    let obsoleteSequence: number = 0;
    let needle: Waiter<T>;

    for (let iterator: number = 0; iterator < this.waiters.length; ++iterator) {
      const waiter: Waiter<T> = this.waiters[iterator];
      const isObsolete: boolean = (waiter.Created < expirationTime || !waiter.Pending);

      if (iterator === obsoleteSequence && isObsolete) {
        waiter.reject('expired');
        ++obsoleteSequence;
        continue;
      }

      if (waiter.Id !== id || isObsolete) {
        continue;
      }

      needle = waiter;
      break;
    }

    if (!needle) {
      //
    }

    this.waiters = this.waiters.slice(obsoleteSequence);

    return needle;
  }
}

export { WaitersQueue };
