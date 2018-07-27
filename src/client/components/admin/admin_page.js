import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { signInAs } from '../../actions/auth_actions';
import { getAllUsers, clearBannerMessage, setAdminStatus, getLogs } from '../../actions/admin_actions';
import { CLEAR_USER } from '../../actions/common_types';
import SearchUsers from './search_users';
import EmailUsers from './email_users';
import SetBannerText from './set_banner_text';

class AdminPage extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      showHide: [
        { showEmailForm: false },
        { showBannerForm: false },
        { showBannerClearConfirm: false },
        { showUsersList: false },
        { showAdminsList: false },
        { showSearchform: false },
        { showUserFromSearch: false },
        { showLogsList: false }
      ]
    };
  }

  changeState(ev) {
    // Only display one element at a time
    this.state.showHide.map(item => {
      Object.keys(item).map(key => {
        if (key === ev.target.id) {
          this.setState({ [key]: true });
        } else {
          this.setState({ [key]: false });
        }
      });
    });
  }

  componentDidMount() {
    const {
      getAllUsers,
      dispatch
    } = this.props;

    getAllUsers();
    /* clear out user info from any previous logInAs sessions */
    dispatch({ type: CLEAR_USER });
  }

  componentWillReceiveProps(nextProps) {
    const {
      emailSent,
      adminMessage,
      userFromSearch,
      getAllUsers,
    } = this.props;

    if (nextProps.emailSent !== emailSent) {
      this.setState({ showEmailForm: false });
    }

    if (nextProps.adminMessage !== adminMessage) {
      getAllUsers();
    }

    if (nextProps.userFromSearch !== userFromSearch) {
      this.setState({ showUserFromSearch: true });
    }
  }

  makeAdmin(user) {
    if (!user.isAdmin) {
      return <Link to='#' className='btn btn-danger btn-xs' onClick={() => this.props.setAdminStatus(user._id)}>Set to Admin</Link>;
    } else {
      return <Link to='#' className='btn btn-danger btn-xs' onClick={() => this.props.setAdminStatus(user._id)}>Revoke Admin</Link>;
    }
  }

  renderUsers(user) {
    if (!user.isAdmin && !user.email.includes('@tempemail.ca')) {
      return (
        <li key={user._id}>
          <p>User ID: {user._id}</p>
          <p>Email: {user.email}</p>
          <p>Sign up date: {moment(user.createdAt).format('MMMM Do YYYY')}</p>

          <div className='list_btns'>
            <Link to='#' onClick={() => {
              this.props.signInAs(user.email);
              this.context.router.history.push('/');
            }} className='btn btn-default btn-xs'>Login As User</Link>
            {this.makeAdmin(user)}
          </div>
        </li>
      );
    }
  }

  renderAdminUsers(user) {
    if (user.isAdmin) {
      return (
        <li key={user._id}>
          <p>User ID: {user._id}</p>
          <p>Email: {user.email}</p>
          <p>Sign up date: {moment(user.createdAt).format('MMMM Do YYYY')}</p>

          <div className='list_btns'>
            <Link to='#' onClick={() => {
              this.props.signInAs(user.email);
              this.context.router.history.push('/');
            }} className='btn btn-default btn-xs'>Login As User</Link>
            {this.makeAdmin(user)}
          </div>
        </li>
      );
    }
  }

  renderUserFromSearch(user) {
    return (
      <li key={user._id}>
        <p>User ID: {user._id}</p>
        <p>Email: {user.email}</p>
        <p>Sign up date: {moment(user.sign_up_date).format('MMMM Do YYYY')}</p>

        <div className='list_btns'>
          <Link to='#' onClick={() => {
            this.props.signInAs(user.email);
            this.context.router.history.push('/');
          }} className='btn btn-default btn-xs'>Login As User</Link>
          {this.makeAdmin(user)}
        </div>
      </li>
    );
  }

  showUsers() {
    const { allUsers } = this.props;

    if (this.state.showUsersList) {
      return (
        <div className='col-sm-7'>
          <h4>Users</h4>
          <ul className='user_list'>
            {allUsers.map(user => this.renderUsers(user))}
          </ul>
        </div>
      );
    }
  }

  showAdmins() {
    const { allUsers } = this.props;

    if (this.state.showAdminsList) {
      return (
        <div className='col-sm-7'>
          <h4>Admin Users</h4>
          <ul className='user_list'>
            {allUsers.map(user => this.renderAdminUsers(user))}
          </ul>
        </div>
      );
    }
  }

  showSearchResult() {
    const { userFromSearch } = this.props;

    if (this.state.showUserFromSearch && userFromSearch) {
      return (
        <ul className='user_list col-sm-7'>
          {this.renderUserFromSearch(userFromSearch)}
        </ul>
      );
    }
  }

  showLogs() {
    const { logs } = this.props;
    const { showLogsList } = this.state;

    if (showLogsList && logs) {
      const logArr = logs.split(/(?:\r\n|\r|\n|,)/g);
      return logArr.map((item, index) => <li key={index}><p>{index}: {item}</p></li>);
    }
  }

  closeBannerForm() {
    this.setState({ showBannerForm: false });
  }

  renderBannerInput() {
    const { showBannerForm } = this.state;

    if (showBannerForm) return <SetBannerText closeBanner={() => this.closeBannerForm()} />;
  }

  renderClearBannerConfirm() {
    const { showBannerClearConfirm } = this.state;

    if (showBannerClearConfirm) {
      return (
        <div className='col-sm-8 form_div'>
          <div className='form-group'>
            <label>Are you sure you would like to clear the banner for all users?</label>
          </div>
          <div className='form-group'>
            <Link to='#' onClick={() => this.setState({ showBannerClearConfirm: false })} className='btn btn-danger'>Cancel</Link>
            <Link to='#' className='btn btn-success pull-right' onClick={() => {
              this.props.clearBannerMessage();
              this.setState({ showBannerClearConfirm: false });
            }}>Yes</Link>
          </div>
        </div>
      );
    }
  }

  closeEmailForm() {
    this.setState({ showEmailForm: false });
  }

  renderEmailForm() {
    const { showEmailForm } = this.state;

    if (showEmailForm) return <EmailUsers {...this.props} closeEmail={() => this.closeEmailForm()} />;
  }

  closeSearchForm() {
    this.setState({
      showSearchform: false,
      showUserFromSearch: false
    });
  }

  renderSearchUsersForm() {
    const { showSearchform } = this.state;

    if (showSearchform) return <SearchUsers closeSearch={() => this.closeSearchForm()} />;
  }

  renderActions() {
    const { getLogs } = this.props;

    return (
      <ul className='admin_actions'>
        <li>
          <Link to='#' id='showUsersList' onClick={(ev) => this.changeState(ev)}>Users List</Link>
        </li>
        <li>
          <Link to='#' id='showAdminsList' onClick={(ev) => this.changeState(ev)}>Admin Users List</Link>
        </li>
        <li>
          <Link to='#' id='showEmailForm' onClick={(ev) => this.changeState(ev)}>Email All Users</Link>
        </li>
        <li>
          <Link to='#' id='showBannerForm' onClick={(ev) => this.changeState(ev)}>Banner Notification</Link>
        </li>
        <li>
          <Link to='#' id='showBannerClearConfirm' onClick={(ev) => this.changeState(ev)}>Clear Banner Notification</Link>
        </li>
        <li>
          <Link to='#' id='showSearchform' onClick={(ev) => this.changeState(ev)}>Search All Users</Link>
        </li>
        <li>
          <Link to='#' id='showLogsList' onClick={(ev) => { this.changeState(ev); getLogs(); }}>Check Error Logs</Link>
        </li>
      </ul>
    );
  }

  render() {
    const { allUsers } = this.props;

    if (!allUsers) return <div>Loading...</div>;

    return (
      <section className='row'>
        <article className='col-sm-12'>
          <h3>Admin</h3>
          <div className='col-sm-2'>
            {this.renderActions()}
          </div>
          <div className='col-sm-8 col-sm-offset-1'>
            {this.showAdmins()}
            {this.showUsers()}
            {this.renderBannerInput()}
            {this.renderClearBannerConfirm()}
            {this.renderSearchUsersForm()}
            {this.showSearchResult()}
            {this.renderEmailForm()}
            <ul className='logs_list'>
              {this.showLogs()}
            </ul>
          </div>
        </article>
      </section>
    );
  }
}

const mapStateToProps = ({ admin, auth }) => {
  return {
    adminUser: auth.adminUser,
    allUsers: admin.allUsers,
    userFromSearch: admin.userFromSearch,
    emailSent: admin.adminEmailSent,
    adminMessage: admin.adminMessage,
    logs: admin.logs
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllUsers,
    clearBannerMessage,
    signInAs,
    setAdminStatus,
    getLogs,
    dispatch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
