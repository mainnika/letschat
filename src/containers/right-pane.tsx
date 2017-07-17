import * as React from 'react';

import _ from '../configs/strings';

import { Hello } from '../components/hello';
import { Message } from '../components/message';

interface IRightPane { }

class RightPane extends React.Component<IRightPane> {

  public render(): false | JSX.Element {

    return (
      <div className='pane right-pane'>

        <div className='chat-title'>
          <Hello compiler='foo' framework='bar' />
        </div>

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

        <div className='chat-input'>
          <form className='chat-input-form form-inline'>
            <div className='chat-input-text'>
              <textarea className='form-control form-control-lg' placeholder='Hello from foo and bar!' rows={1}></textarea>
            </div>
            <div className='chat-input-button'>
              <button type='button' className='btn btn-outline-primary btn-lg'>{_.sendMessageBtn}</button>
            </div>
          </form>
        </div>

      </div>
    );
  }
}

export { RightPane };
