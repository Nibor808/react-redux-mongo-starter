import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { modalStyle } from '../../../helpers/client/modal_style';
import { renderField } from '../../../helpers/client/render_field';
import { Field, reduxForm, reset } from 'redux-form';
import { checkPassword, SHOW_AUTH_FOR_ACCOUNT } from '../../actions/auth_actions';

class AccountAuthModal extends Component {

  closeAFAModal() {
    const { dispatch } = this.props;

    dispatch({
      type: SHOW_AUTH_FOR_ACCOUNT,
      showAFA: false
    });

    dispatch(reset('password'));
  }

  handlePasswordFormSubmit(values) {
    const {
      dispatch,
      checkPassword,
      user,
      adminUser
    } = this.props;
    const userId = adminUser && !user ? adminUser.user_id : user.user_id;

    checkPassword(userId, values.password);

    dispatch({
      type: SHOW_AUTH_FOR_ACCOUNT,
      showAFA: false
    });

    dispatch(reset('password'));
  }

  render() {
    const { showAFA, handleSubmit } = this.props;

    return (
      <Modal
        appElement={document.getElementById('root')}
        isOpen={showAFA}
        style={modalStyle}
        contentLabel='Authentication'
        onRequestClose={() => this.closeAFAModal()}
      >
        <form onSubmit={handleSubmit(this.handlePasswordFormSubmit.bind(this))}>
          <p>
            Enter your password to acces the Account Options.
          </p>
          <Field
            name='password'
            type='password'
            label='Password'
            component={renderField}
          />

          <div className='form-group'>
            <button type='submit' className='btn btn-success btn-xs pull-right'>Authenticate</button>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    adminUser: auth.adminUser,
    showAFA: auth.showAFA
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    checkPassword,
    dispatch
  }, dispatch);
};

export default reduxForm({
  form: 'password'
})(connect(mapStateToProps, mapDispatchToProps)(AccountAuthModal));
