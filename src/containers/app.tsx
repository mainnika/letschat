import * as React from 'react';

import { connect, DispatchProp } from 'react-redux';

import { AuthActions } from '../actions/auth-actions';
import { IStore } from '../reducers';

import { Header } from './header';
import { LeftPane } from './left-pane';
import { RightPane } from './right-pane';

interface IApp { }

class AppContainer extends React.Component<IApp & DispatchProp<IStore>> {

  public static updateProps(state: IStore): IApp {

    return {};
  }

  public componentDidMount(): void {

    const { dispatch } = this.props;
    dispatch(AuthActions.initAuth());
  }

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

const App = connect(AppContainer.updateProps)(AppContainer);

export { App };
