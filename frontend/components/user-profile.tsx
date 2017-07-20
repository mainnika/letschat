'use strict';

import * as React from 'react';

import { DispatchProp } from 'react-redux';

import { AuthActions } from '../actions/auth-actions';
import { IStore } from '../constants/store';

import _ from '../constants/strings';

interface IUserProfile {
  authorized?: boolean;
  nickname?: string;
  state?: number;
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
            {this.renderConnectionState()}
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

  private renderConnectionState(): string {

    switch (this.props.state) {

      case WebSocket.CONNECTING:
        return _.profileConnConnecting;

      case WebSocket.OPEN:
        return _.profileConnActive;

      case WebSocket.CLOSED:
      case WebSocket.CLOSING:
      default:
        return _.profileConnError;
    }
  }
}

export { UserProfile };
