import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../../helpers/client/render_field';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { signInUser } from '../../actions/auth_actions';
import { connect } from 'react-redux';
import { CLEAR_MESSAGE } from '../../actions/common_types';

class SignInForm extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    this.props.dispatch({ type: CLEAR_MESSAGE });
  }

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { user, adminUser } = this.props;

    if (nextProps.adminUser !== adminUser || nextProps.user !== user) {
      router.history.push('/');
    }
  }

  onFormSubmit({ email, password }) {
    this.props.signInUser({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <section className='row'>
        <article className='col-sm-10 col-sm-offset-1 signin_form'>
          <div className='col-sm-10 col-sm-offset-1 form_div'>
            <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))} className='col-sm-8 col-md-6'>
              <h2>Sign In</h2>

              <Field
                name='email'
                type='email'
                label='Email:'
                component={renderField}
              />

              <Field
                name='password'
                type='password'
                label='Password:'
                component={renderField}
              />
              <div className='form-group form_btns'>
                <button type='submit' className='btn btn-success'>Sign In</button>
              </div>

              <div className='col-sm-12 passreset'>
                <p>Forgot your password?</p>
                <Link to='/passwordresetform'>Click here to reset it.</Link>
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

  if (!values.email) {
    errors.email = ' ';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = ' ';
  }

  return errors;
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    adminUser: auth.adminUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signInUser,
    dispatch
  }, dispatch);
};

export default reduxForm({
  form: 'sign_in',
  validate
})(connect(mapStateToProps, mapDispatchToProps)(SignInForm));
