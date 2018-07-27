import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../../helpers/client/render_field';
import { changePassword, SHOW_ELEMENT } from '../../actions/user_actions';

class ChangePassword extends Component {

  handleFormSubmit(values) {
    const { user, adminUser } = this.props;
    const userId = adminUser && !user ? adminUser.user_id : user.user_id;

    this.props.changePassword(values.password, userId);
  }

  render() {
    const { handleSubmit, dispatch } = this.props;

    return (
      <div className='col-sm-6 element_background bordered_element'>
        <h4>Change Your Password</h4>

        <div className='row'>
          <div className='col-sm-8 form_div'>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field
                name='password'
                type='password'
                label='Enter a new password'
                component={renderField}
              />

              <Field
                name='confirm_password'
                type='password'
                label='Re-enter your new password'
                component={renderField}
              />

              <div className='form-group action_btns'>
                <span className='btn btn-danger' onClick={() => dispatch({
                  type: SHOW_ELEMENT,
                  payload: 'progress_tracker'
                })}>Cancel</span>
                <button type='submit' className='btn btn-success pull-right'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    adminUser: auth.adminUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changePassword,
    dispatch
  }, dispatch);
};

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = ' ';
  }
  if (!values.confirm_password) {
    errors.confirm_password = 'Please confirm your password';
  }
  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Passwords must match';
  }

  return errors;
};

export default reduxForm({
  form: 'change_password',
  validate
})(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));
