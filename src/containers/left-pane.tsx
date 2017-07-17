import * as React from 'react';

import { Contacts } from '../components/contacts';
import { Hello } from '../components/hello';

interface ILeftPane { }

class LeftPane extends React.Component<ILeftPane> {

  public render(): false | JSX.Element {

    return (
      <div className='pane left-pane'>

        <div className='user-profile'>
          <Hello compiler='foo' framework='bar' />
        </div>

        <Contacts />

      </div>
    );
  }
}

export { LeftPane };
