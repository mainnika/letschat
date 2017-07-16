import * as React from 'react';

import _ from '../configs/strings';

import { Hello } from '../components/hello';

interface IRightPane { }

class RightPane extends React.Component<IRightPane> {

  public render(): false | JSX.Element {

    return (
      <div className='pane col-12 col-md-8'>

        <div className='chat-title row'>
          <Hello compiler='foo' framework='bar' />
        </div>

        <div className='chat-messages row'>
          <Hello compiler='foo' framework='bar' />
          <Hello compiler='foo' framework='bar' />
          <Hello compiler='foo' framework='bar' />
          <Hello compiler='foo' framework='bar' />
          <Hello compiler='foo' framework='bar' />
          <Hello compiler='foo' framework='bar' />
          <Hello compiler='foo' framework='bar' />
          <Hello compiler='foo' framework='bar' />
          <Hello compiler='foo' framework='bar' />
          <Hello compiler='foo' framework='bar' />
          <Hello compiler='foo' framework='bar' />
        </div>

        <div className='chat-input row'>
          <form className='form-inline'>
            <div className='chat-input-text col-9'>
              <textarea className='form-control form-control-lg' placeholder='Hello from foo and bar!' rows={1}></textarea>
            </div>
            <div className='chat-input-button col-3'>
              <button type='button' className='btn btn-outline-primary btn-lg'>{_.sendMessageBtn}</button>
            </div>
          </form>
        </div>

      </div>
    );
  }
}

export { RightPane };
