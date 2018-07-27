import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import AccountContainer from './account_container';
import AccountAuthModal from './account_auth_modal';
import { SHOW_AUTH_FOR_ACCOUNT } from '../../actions/auth_actions';

class MyAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditForm: false,
      editPath: '',
      showEditCI: false
    };
  }

  static propTypes = {
    confirmEmail: PropTypes.string,
    updatePass: PropTypes.string,
    elementType: PropTypes.string,
    showAFA: PropTypes.bool
  };

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    const {
      dispatch
    } = this.props;

    dispatch({
      type: SHOW_AUTH_FOR_ACCOUNT,
      showAFA: false
    });
  }


  renderAuthForAccountModal() {
    const { showAFA, elementType } = this.props;

    if (showAFA && elementType !== 'account') {
      return <AccountAuthModal />;
    }
  }

  renderElement() {
    const {
      elementType,
    } = this.props;

    if (elementType === 'account') {
      return <AccountContainer />;
    }
  }

  render() {
    const { dispatch, user, adminUser } = this.props;
    const userId = adminUser && !user ? adminUser.user_id : user.user_id;

    if (!userId) return <div>Loading...</div>;

    return (
      <div className='dashboard'>
        {this.renderAuthForAccountModal()}

        <div className='col-sm-12 dashboard_head'>
          <div className='col-sm-12'>
            <ul className='user_actions'>
              <li>
                <span className='user_actions_link' onClick={() => dispatch({ type: SHOW_AUTH_FOR_ACCOUNT, showAFA: true })}>
                  My Account
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className='col-sm-12'>
          {this.renderElement()}
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ auth, actions }) => {
  return {
    user: auth.user,
    adminUser: auth.adminUser,
    confirmEmail: auth.confirmEmail,
    updatePass: actions.updatePass,
    elementType: actions.elementType,
    showAFA: auth.showAFA
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
