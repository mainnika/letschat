import * as React from 'react';

import _ from '../configs/strings';

import { Hello } from '../components/hello';

interface ILeftPane { }

class Header extends React.Component<ILeftPane> {

  public render(): false | JSX.Element {

    return (
      <div className='header'>
        <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>

          <button
            className='navbar-toggler navbar-toggler-right'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <a className='navbar-brand' href='#'>{_.pageTitle}</a>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
            </ul>
            <form className='form-inline my-2 my-lg-0'>
              <input className='form-control mr-sm-2' type='text' placeholder={_.globalSearchBtn} />
              <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>{_.globalSearchBtn}</button>
            </form>
          </div>

        </nav>
      </div>
    );
  }
}

export { Header };
