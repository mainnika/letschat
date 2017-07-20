'use strict';

import * as React from 'react';

import { Message } from '../components/message';

interface IMessages { }

class Messages extends React.Component {

  public render(): JSX.Element {

    return (
      <div className='chat-messages'>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    );
  }
}

export { Messages, IMessages };
