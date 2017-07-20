import * as React from 'react';

import { connect, DispatchProp } from 'react-redux';

import _ from '../constants/strings';

import { ChatTitle } from '../components/chat-title';
import { Messages } from '../components/messages';
import { IStore } from '../constants/store';

interface IRightPane { }

class RightPaneContainer extends React.Component<IRightPane & DispatchProp<IStore>> {

  public static updateProps(state: IStore): IRightPane {

    return {};
  }

  public render(): false | JSX.Element {

    return (
      <div className='pane right-pane'>

        <ChatTitle />
        <Messages />

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

const RightPane = connect(RightPaneContainer.updateProps)(RightPaneContainer);

export { RightPane };
