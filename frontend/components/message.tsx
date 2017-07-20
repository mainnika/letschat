'use strict';

import * as React from 'react';

interface IMessage { }

class Message extends React.Component {

  public render(): JSX.Element {

    return (
      <div className='chat-messages-message'>
        <div className='chat-messages-message-avatar'>
          <img src='//via.placeholder.com/64x64' />
        </div>
        <div className='chat-messages-message-info'>
          <div className='chat-messages-message-name'>
            NAME
        </div>
          <div className='chat-messages-message-text'>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
 nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
 nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
 deserunt mollit anim id est laborum.`}
          </div>
        </div>
      </div>
    );
  }
}

export { Message, IMessage };
