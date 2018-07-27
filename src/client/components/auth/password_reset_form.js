import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { renderField } from '../../../helpers/client/render_field';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPasswordRequest } from '../../actions/user_actions';
import { CLEAR_MESSAGE } from '../../actions/common_types';

class PasswordResetForm extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.dispatch({ type: CLEAR_MESSAGE });
  }

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { passReset } = this.props;

    if (nextProps.passReset !== passReset) {
      router.history.push('/');
    }
  }

  onFormSubmit({ email }) {
    this.props.resetPasswordRequest({ email });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <section className='row'>
        <article className='col-sm-10 col-sm-offset-1 pass_reset'>
          <div className='col-sm-10 col-sm-offset-1 form_div'>
            <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))} className='col-sm-8 col-md-6'>
              <h2>Reset Your Password</h2>

              <Field
                name='email'
                type='email'
                label='Enter your email address:'
                component={renderField}
              />

              <div className='form-group form_btns'>
                <Link to='/signin' className='btn btn-danger'>Cancel</Link>
                <button type='submit' className='btn btn-success pull-right'>Next</button>
              </div>
            </form>
          </div>
        </article>
      </section>
    );
  }
}

const mapStateToProps = ({ actions }) => {
  return {
    passReset: actions.passReset
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    resetPasswordRequest,
    dispatch
  }, dispatch);
};

export default reduxForm({
  form: 'passwordresetform'
})(connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm));
