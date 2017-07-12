import * as React from 'react';

export interface IHello { compiler: string; framework: string; }

export const Hello: (hello: IHello) => JSX.Element =
  (hello: IHello) => <h1>Hello from {hello.compiler} and {hello.framework}!</h1>;
