import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import Modal from 'react-modal';
import { successModalStyle, errorModalStyle } from '../../helpers/client/modal_style';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { CLEAR_MESSAGE } from '../actions/common_types';
import { bindActionCreators } from 'redux';
import { signOutUser } from '../actions/auth_actions';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startTime: 0,
      openTimeOutModal: false,
      openSuccessModal: false,
      openErrorModal: false
    };
  }

  static propTypes = {
    confirmEmail: PropTypes.string,
    emailError: PropTypes.string,
    authError: PropTypes.string,
    updatePass: PropTypes.string,
    updatePassError: PropTypes.string,
    passReset: PropTypes.string,
    passResetError: PropTypes.string,
    updateEmailError: PropTypes.string
  };

  static contextTypes = {
    router: PropTypes.object
  };


  componentDidMount() {
    document.addEventListener('click', this.handleEvent.bind(this));
    document.addEventListener('scroll', this.handleEvent.bind(this));
    document.addEventListener('touchstart', this.handleEvent.bind(this));
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.updatePass ||
      nextProps.passReset ||
      nextProps.confirmEmail) {
      this.setState({ openSuccessModal: true });
    }

    if (nextProps.authError ||
      nextProps.passResetError ||
      nextProps.updatePassError ||
      nextProps.updateEmailError ||
      nextProps.emailError) {
      this.setState({ openErrorModal: true });
    }
  }

  handleEvent(ev) {
    const { startTime } = this.state;

    if (ev.timeStamp - startTime >= 36000000) {
      this.setState({ openTimeOutModal: true });
    }

    this.setState({ startTime: ev.timeStamp });
  }

  closeTimeOutModal() {
    const { proceedingId, progressTracker, signOutUser } = this.props;

    signOutUser(proceedingId, progressTracker);

    this.setState({ openTimeOutModal: false });

    document.removeEventListener('click', this.handleEvent.bind(this));
    document.removeEventListener('scroll', this.handleEvent.bind(this));
    document.removeEventListener('touchstart', this.handleEvent.bind(this));
  }

  renderTimeOutModal() {
    const { openTimeOutModal } = this.state;

    if (openTimeOutModal) {
      return (
        <Modal
          appElement={document.getElementById('root')}
          isOpen={openTimeOutModal}
          onRequestClose={() => this.closeTimeOutModal()}
          style={errorModalStyle}
          contentLabel='Session Expired Modal'
        >
          <p style={{ 'marginBottom': 0 }}>
            Your session has timed out.
            Please sign back in.
          </p>
        </Modal>
      );
    }
  }

  closeModal() {
    this.setState({ openSuccessModal: false });
    this.setState({ openErrorModal: false });
    this.props.dispatch({ type: CLEAR_MESSAGE });
  }

  renderSuccessModal() {
    const {
      updatePass,
      passReset,
      confirmEmail
    } = this.props;
    const { openSuccessModal } = this.state;

    if (openSuccessModal) {
      return (
        <Modal
          appElement={document.getElementById('root')}
          isOpen={openSuccessModal}
          onRequestClose={() => this.closeModal()}
          style={successModalStyle}
          contentLabel='Success Modal'
        >
          <p style={{ 'marginBottom': 0 }}>
            {
              updatePass ||
              passReset ||
              confirmEmail
            }
          </p>
        </Modal>
      );
    }
  }

  renderErrorModal() {
    const {
      authError,
      passResetError,
      updatePassError,
      updateEmailError,
      emailError
    } = this.props;
    const { openErrorModal } = this.state;

    if (openErrorModal) {
      return (
        <Modal
          appElement={document.getElementById('root')}
          isOpen={openErrorModal}
          onRequestClose={() => this.closeModal()}
          style={errorModalStyle}
          contentLabel='Error Modal'
        >
          <p style={{ 'marginBottom': 0 }}>
            {
              authError ||
              passResetError ||
              updatePassError ||
              updateEmailError ||
              emailError
            }
          </p>
        </Modal>
      );
    }
  }

  renderAdmin() {
    const { user, adminUser } = this.props;

    if (adminUser && user) return <div className='col-sm-12'>logged in as: {user.email} - Return to Admin to log out of this user</div>;
  }

  render() {
    const { routes } = this.props.route;

    return (
      <div>
        {this.renderTimeOutModal()}
        {this.renderSuccessModal()}
        {this.renderErrorModal()}
        <Header />

        {this.renderAdmin()}

        {renderRoutes(routes)}

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, actions }) => {
  return {
    adminUser: auth.adminUser,
    user: auth.user,
    confirmEmail: auth.confirmEmail,
    emailError: actions.emailError,
    authError: auth.error,
    updatePass: actions.updatePass,
    updatePassError: actions.updatePassError,
    passReset: actions.passReset,
    passResetError: actions.passResetError,
    updateEmailError: actions.updateEmailError
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signOutUser,
    dispatch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
