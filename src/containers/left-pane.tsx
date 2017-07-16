import * as React from 'react';

import { Contact } from '../components/contact';
import { Hello } from '../components/hello';

interface ILeftPane { }

class LeftPane extends React.Component<ILeftPane> {

  public render(): false | JSX.Element {

    return (
      <div className='pane left-pane'>

        <div className='user-profile'>
          <Hello compiler='foo' framework='bar' />
        </div>

        <div className='user-list'>
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
          <Contact />
        </div>

      </div>
    );
  }
}

export { LeftPane };
