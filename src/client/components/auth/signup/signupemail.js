import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { renderField } from '../../../../helpers/client/render_field';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CLEAR_MESSAGE } from '../../../actions/common_types';

class SignUpEmail extends Component {

  componentWillMount() {
    this.props.dispatch({ type: CLEAR_MESSAGE });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <article className='col-sm-10 col-sm-offset-1 signup_form'>
        <div className='col-sm-12'>
          <Link to='/initialquestions'>&#8592; Back</Link>
        </div>
        <div className='col-sm-10 col-sm-offset-1 form_div'>
          <form onSubmit={handleSubmit}>
            <h3>Now let's get you set up with a free account.</h3>

            <p>Having an account will:</p>
            <ul>
              <li>keep your information secure</li>
              <li>allow you to start and stop and go at your own pace</li>
              <li>let you access all of your completed forms</li>
            </ul>

            <p>
              To create the account, all you need to provide is an email and a password.
            </p>

            <p>
              Once the account is created, you'll use your email and password to log in.
            </p>

            <div className='row'>
              <div className='col-sm-6'>
                <Field
                  name='email'
                  type='email'
                  label='Email:'
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

  if (!values.email) {
    errors.email = ' ';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ' ';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    initialValues: getFormValues('form_wizard_signup')(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatch
  }, dispatch);
};

export default reduxForm({
  form: 'form_wizard_signup',
  destroyOnUnmount: false,
  validate
})(connect(mapStateToProps, mapDispatchToProps)(SignUpEmail));
