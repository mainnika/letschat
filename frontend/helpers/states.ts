'use strict';

export { States, IStatesRules };

interface IStatesRules<T, E> {
  from: T;
  raise: E;
  to: T;
}

type IResolver<T, E> = (event: E, prev: T, next: T) => void;

type IRulesMap<T, E, K extends keyof T> = {[from in K]?: {[to in K]?: E } };

enum fFoo {
  a, b,
}

class States<T, E> {

  private current: T;
  private resolver: IResolver<T, E>;
  private rules: IRulesMap<T, E, keyof T>;

  public constructor(
    initial: T,
    rules: IStatesRules<T, E>[],
    resolver: IResolver<T, E>,
  ) {

    this.current = initial;
    this.resolver = resolver;
    this.rules = {};

    for (const rule of rules) {
      const transitions: IRulesMap<T, E, keyof T>[0] = this.rules[rule.from] = this.rules[rule.from] ? this.rules[rule.from] : {};
      transitions[rule.to] = transitions[rule.to] ? transitions[rule.to] : rule.raise;
    }
  }

  public set State(next: T) {

    const prev: T = this.current;
    const possible: IRulesMap<T, E, keyof T>[0] = this.rules[prev];

    if (possible === undefined || possible[next] === undefined) {
      return;
    }

    const raise: E = possible[next];

    this.current = next;
    this.resolver(raise, prev, next);
  }

  public get State(): T {

    return this.current;
  }
}
