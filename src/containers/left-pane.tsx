import * as React from 'react';

import { Contacts } from '../components/contacts';
import { UserProfile } from '../components/user-profile';

interface ILeftPane { }

class LeftPane extends React.Component<ILeftPane> {

  public render(): false | JSX.Element {

    return (
      <div className='pane left-pane'>
        <UserProfile />
        <Contacts />
      </div>
    );
  }
}

export { LeftPane };
