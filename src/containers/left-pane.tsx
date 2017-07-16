import * as React from 'react';

import { Contact } from '../components/contact';
import { Hello } from '../components/hello';

interface ILeftPane { }

class LeftPane extends React.Component<ILeftPane> {

  public render(): false | JSX.Element {

    return (
      <div className='pane col-12 col-md-3'>

        <div className='user-profile row'>
          <Hello compiler='foo' framework='bar' />
        </div>

        <div className='user-list row'>
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
