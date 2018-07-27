import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../../helpers/client/render_field';
import { sendEmail } from '../../actions/admin_actions';

class SearchUsers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allUsersEmail: []
    };
  }

  componentWillMount() {
    const { allUsers } = this.props;
    const { allUsersEmail } = this.state;

    allUsers.map(user => {
      allUsersEmail.push(user.email);
    });

    this.props.initialize({ allUsersEmail });
  }

  onEmailFormSubmit(values) {
    this.props.sendEmail(values);
  }

  render() {
    const { handleSubmit } = this.props;
    const { allUsersEmail } = this.state;

    return (
      <div className='col-sm-9 form_div'>
        <h4>Email</h4>
        <form onSubmit={handleSubmit(this.onEmailFormSubmit.bind(this))}>
          <Field
            name='email'
            type='text'
            label='To'
            input={{ value: allUsersEmail, readOnly: true }}
            component={renderField}
          />

          <Field
            name='mailSubject'
            type='text'
            label='Subject'
            component={renderField}
          />

          <Field
            name='mailContent'
            type='textarea'
            label='Message'
            component={renderField}
          />

          <div className='form-group form_btns'>
            <Link to='#' className='btn btn-danger' onClick={() => this.props.closeEmail()}>Cancel</Link>
            <button type='submit' className='btn btn-success pull-right'>Send</button>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.mailSubject) {
    errors.mailSubject = 'Email must have a subject';
  }

  if (!values.mailContent) {
    errors.mailContent = 'Email must have content';
  }

  return errors;
};

export default connect(null, { sendEmail })(reduxForm({
  form: 'search_form',
  validate
})(SearchUsers));
