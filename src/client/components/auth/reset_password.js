import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../../helpers/client/render_field';
import { resetPassword } from '../../actions/user_actions';
import { Link } from 'react-router-dom';

class ResetPassword extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { passReset } = this.props;

    if (nextProps.passReset !== passReset) {
      router.history.push('/signin');
    }
  }

  onFormSubmit({ password }) {
    const { token, id } = this.props.match.params;
    this.props.resetPassword({ password, token, id });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <section className='row'>
        <article className='col-sm-10 col-sm-offset-1 pass_reset'>
          <div className='col-sm-10 col-sm-offset-1 form_div'>
            <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))} className='col-sm-8 col-md-6'>
              <h3>New Password</h3>
              <Field
                name='password'
                type='password'
                label='Enter your new password:'
                component={renderField}
              />

              <Field
                name='confirm_password'
                type='password'
                label='Confirm your new password:'
                component={renderField}
              />
              <div className='form-group'>
                <Link to='/signin' className='btn btn-danger'>Cancel</Link>
                <button type='submit' className='btn btn-success pull-right'>Submit</button>
              </div>
            </form>
          </div>
        </article>
      </section>
    );
  }
}

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

const mapStateToProps = ({ actions }) => {
  return {
    passReset: actions.passReset
  };
};

export default reduxForm({
  form: 'passwordreset',
  validate
})(connect(mapStateToProps, { resetPassword })(ResetPassword));
