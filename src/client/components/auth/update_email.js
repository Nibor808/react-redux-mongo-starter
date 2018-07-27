import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../../helpers/client/render_field';
import { updateEmail, getEmail, SHOW_ELEMENT } from '../../actions/user_actions';
import RequireAuth from './require_auth';

class UpdateEmail extends Component {

  componentWillMount() {
    const { user, adminUser, getEmail } = this.props;
    const userId = adminUser && !user ? adminUser.user_id : user.user_id;

    getEmail(userId);
  }

  handleFormSubmit(values) {
    const { user, adminUser } = this.props;
    const userId = adminUser && !user ? adminUser.user_id : user.user_id;

    this.props.updateEmail(values.email, userId);
  }

  render() {
    const {
      handleSubmit,
      email,
      dispatch
    } = this.props;

    return (
      <div className='col-sm-6 element_background bordered_element'>
        <h4>Change Your Email Address</h4>
        <p>Your current email address is: {email}</p>
        <div className='row'>
          <div className='col-sm-8 form_div'>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field
                name='email'
                type='email'
                label='Enter a new email address'
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

const mapStateToProps = ({ auth, actions }) => {
  return {
    user: auth.user,
    adminUser: auth.adminUser,
    email: actions.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateEmail,
    getEmail,
    dispatch
  }, dispatch);
};

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = ' ';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default reduxForm({
  form: 'update_email',
  validate
})(connect(mapStateToProps, mapDispatchToProps)(RequireAuth(UpdateEmail)));
