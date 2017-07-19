import * as React from 'react';

interface IChatTitle { }

class ChatTitle extends React.Component {

  public render(): JSX.Element {

    return (

      <div className='chat-title'>
        <div className='chat-title-info'>
          <div className='chat-title-name'>
            <h3>
              NAME
            </h3>
          </div>
          <div className='chat-title-status'>
            STATUS
          </div>
        </div>
      </div>
    );
  }
}

export { ChatTitle, IChatTitle };
