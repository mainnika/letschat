'use strict';

import * as React from 'react';

import { Contact } from '../components/contact';

interface IContacts { }

class Contacts extends React.Component {

  public render(): JSX.Element {

    return (
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
    );
  }
}

export { Contacts, IContacts };
