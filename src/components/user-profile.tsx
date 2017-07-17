import * as React from 'react';

interface IUserProfile { }

class UserProfile extends React.Component {

  public render() {

    return (
      <div className='user-profile'>
        <div className='user-profile-avatar'>
          <img src='//via.placeholder.com/128x128' />
        </div>
        <div className='user-profile-info'>
          <div className='user-profile-name'>
            <h2>
              NAME
            </h2>
          </div>
          <div className='user-profile-status'>
            STATUS
          </div>
        </div>
      </div>
    );
  }
}

export { UserProfile, IUserProfile };
