import * as React from 'react';

import { connect, DispatchProp } from 'react-redux';

import { Contacts } from '../components/contacts';
import { UserProfile } from '../components/user-profile';
import { IStore } from '../constants/store';

interface ILeftPane {
  conn?: {
    state: number;
  };
  user?: {
    authorized: boolean;
    nickname: string;
  };
}

class LeftPaneContainer extends React.Component<ILeftPane & DispatchProp<IStore>> {

  public static updateProps(state: IStore): ILeftPane {

    return {
      conn: {
        state: state.conn.state,
      },
      user: {
        authorized: !!state.auth.user,
        nickname: state.auth.user,
      },
    };
  }

  public render(): false | JSX.Element {

    const { dispatch, conn, user } = this.props;

    return (
      <div className='pane left-pane'>
        <UserProfile
          dispatch={dispatch}
          authorized={user.authorized}
          nickname={user.nickname}
          state={conn.state}
        />
        <Contacts />
      </div>
    );
  }
}

const LeftPane = connect(LeftPaneContainer.updateProps)(LeftPaneContainer);

export { LeftPane };
