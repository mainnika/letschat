'use strict';

class Cache<E> {

  private cache: { [key: string]: E };

  public constructor() {

    this.cache = {};
  }

  public find(key: string): E | undefined {

    return this.cache[key];
  }

  public push(key: string, el: E): E {

    return this.cache[key] = el;
  }
}

export { Cache };
