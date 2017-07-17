import * as React from 'react';

interface IContact { }

class Contact extends React.Component {

  public render() {

    return (
      <div className='user-list-contact'>
        <div className='user-list-contact-avatar'>
          <img src='//via.placeholder.com/48x48' />
        </div>
        <div className='user-list-contact-info'>
          <div className='user-list-contact-name'>
            NAME
          </div>
          <div className='user-list-contact-status'>
            STATUS
          </div>
        </div>
      </div>
    );
  }
}

export { Contact, IContact };
