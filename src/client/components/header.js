import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBannerMessage } from '../actions/admin_actions';
import { signOutUser } from '../actions/auth_actions';
import { BANNER_READ } from '../actions/user_actions';

class Header extends Component {

  componentWillMount() {
    const { getBannerMessage } = this.props;
    getBannerMessage();
  }

  renderBanner() {
    const { bannerRead, dispatch } = this.props;
    let { bannerMessage } = this.props;

    if (bannerMessage !== '' && bannerMessage !== undefined && !bannerRead) {
      return (
        <div className='alert alert-success alert-dismissable text-center banner'>
          <a href='#' className='close' aria-label='close' onClick={() => dispatch({ type: BANNER_READ })}>&times;</a>
          <p>{bannerMessage}</p>
        </div>
      );
    }
  }

  renderAdminLink() {
    const { adminUser } = this.props;

    if (adminUser) return <Link to='/adminpage' style={{ borderRight: '1px solid red' }}>Admin</Link>;
  }

  renderNavRight() {
    const {
      authenticated,
      signOutUser
    } = this.props;

    if (authenticated) {
      return (
        <div className='authed_links'>
          <Link to='/'>My Dashboard</Link>
          <Link to='/#' onClick={() => {
            signOutUser();
          }}>Sign Out</Link>
        </div>
      );
    } else {
      return <Link to='/signin'>Sign In</Link>;
    }
  }

  renderNav() {
    return (
      <header className='row'>
        <nav className='navbar navbar-default col-sm-12'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#main_nav' aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <Link to='/' className='navbar-brand title'>
              <div>The Site Title</div>
            </Link>
          </div>
          <div className='collapse navbar-collapse' id='main_nav'>
            <ul className='nav navbar-nav navbar-right'>
              <li>
                {this.renderAdminLink()}
              </li>
              <li>
                {this.renderNavRight()}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

  render() {
    return (
      <div className='header_box'>
        <div className='row'>
          {this.renderBanner()}
        </div>
        {this.renderNav()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, requiredData, actions }) => {
  return {
    authenticated: auth.authenticated,
    adminUser: auth.adminUser,
    bannerMessage: requiredData.bannerMessage,
    bannerRead: actions.bannerRead,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signOutUser,
    getBannerMessage,
    dispatch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
