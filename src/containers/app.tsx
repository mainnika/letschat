import * as React from 'react';

import { Header } from './header';
import { LeftPane } from './left-pane';
import { RightPane } from './right-pane';

interface IApp { }

class App extends React.Component<IApp> {

  public render(): false | JSX.Element {

    return (
      <div id='root'>

        <Header />

        <div className='content'>
          <LeftPane />
          <RightPane />
        </div>

      </div>
    );
  }
}

export { App };
