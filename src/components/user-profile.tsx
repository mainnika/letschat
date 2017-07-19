import * as React from 'react';

import { DispatchProp } from 'react-redux';

import { AuthActions } from '../actions/auth-actions';
import { IStore } from '../reducers';

import _ from '../configs/strings';

interface IUserProfile {
  authorized?: boolean;
  nickname?: string;
}

class UserProfile extends React.Component<IUserProfile & DispatchProp<IStore>> {

  public render(): JSX.Element {

    return (
      <div className='user-profile'>
        <div className='user-profile-avatar'>
          {this.renderAvatar()}
        </div>
        <div className='user-profile-info'>
          <div className='user-profile-name'>
            <h2>{this.renderName()}</h2>
          </div>
          <div className='user-profile-status'>
          </div>
        </div>
      </div>
    );
  }

  private renderAvatar(): JSX.Element {

    return <img src='//via.placeholder.com/128x128' />;
  }

  private renderName(): string {

    if (this.props.authorized) {
      return this.props.nickname;
    }

    return _.profileAnonymousName;
  }
}

export { UserProfile };
