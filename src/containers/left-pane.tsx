import * as React from 'react';

import { connect, DispatchProp } from 'react-redux';

import { Contacts } from '../components/contacts';
import { UserProfile } from '../components/user-profile';
import { IStore } from '../reducers';

interface ILeftPane {
  user?: {
    authorized: boolean;
    nickname: string;
  };
}

class LeftPaneContainer extends React.Component<ILeftPane & DispatchProp<IStore>> {

  public static updateProps(state: IStore): ILeftPane {

    return {
      user: {
        authorized: !!state.authed.user,
        nickname: state.authed.user,
      },
    };
  }

  public render(): false | JSX.Element {

    const { dispatch, user } = this.props;

    return (
      <div className='pane left-pane'>
        <UserProfile
          dispatch={dispatch}
          authorized={user.authorized}
          nickname={user.nickname}
        />
        <Contacts />
      </div>
    );
  }
}

const LeftPane = connect(LeftPaneContainer.updateProps)(LeftPaneContainer);

export { LeftPane };
