import * as React from 'react';

import { Header } from './header';
import { LeftPane } from './left-pane';
import { RightPane } from './right-pane';

interface IApp { }

class App extends React.Component<IApp> {

  public render(): false | JSX.Element {

    return (
      <div className='chat-root'>

        <Header />

        <div className='content container-fluid row'>
          <LeftPane />
          <RightPane />
        </div>

      </div>
    );
  }
}

export { App };
