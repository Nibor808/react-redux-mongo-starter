import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { renderField } from '../../../../helpers/client/render_field';
import { bindActionCreators } from 'redux';
import { signUpUser } from '../../../actions/auth_actions';
import { connect } from 'react-redux';
import { CLEAR_MESSAGE } from '../../../actions/common_types';

class SignUpPass extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.dispatch({ type: CLEAR_MESSAGE });
  }

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { user } = this.props;

    if (nextProps.user !== user) {
      router.history.push('/commoninfo');
    }
  }

  onFormSubmit() {
    const { formValues, initQsUser, signUpUser, reset } = this.props;
    signUpUser(formValues, initQsUser);
    reset('form_wizard_signup');
  }

  render() {
    const { handleSubmit, previousPage } = this.props;

    return (
      <article className='col-sm-10 col-sm-offset-1 signup_form'>
        <div className='col-sm-12'>
          <span className='span_link' onClick={previousPage}>&#8592; Back</span>
        </div>
        <div className='col-sm-10 col-sm-offset-1 form_div'>
          <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
            <h3>Now create a password.</h3>

            <p>
              Try to make it something that is difficult to guess
              but one that you will remember. If you forget, you can reset
              it when you try to login.
            </p>

            <div className='row'>
              <div className='col-sm-6'>
                <Field
                  name='password'
                  type='password'
                  label='Password:'
                  component={renderField}
                />

                <Field
                  name='confirm_password'
                  type='password'
                  label='Re-enter your password:'
                  component={renderField}
                />
              </div>
            </div>

            <div className='col-sm-12 form-group form_btns'>
              <button type='submit' className='btn btn-success'>Next</button>
            </div>
          </form>
        </div>
      </article>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = ' ';
  }
  if (!values.confirm_password) {
    errors.confirm_password = ' ';
  }
  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Passwords must match';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    formValues: getFormValues('form_wizard_signup')(state),
    user: state.auth.user,
    initQsUser: state.requiredData.initQsUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signUpUser,
    dispatch
  }, dispatch);
};

export default reduxForm({
  form: 'form_wizard_signup',
  destroyOnUnmount: false,
  validate
})(connect(mapStateToProps, mapDispatchToProps)(SignUpPass));
