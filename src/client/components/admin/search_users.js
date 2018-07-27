import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../../helpers/client/render_field';
import { Link } from 'react-router-dom';
import { userSearch } from '../../actions/admin_actions';
import { connect } from 'react-redux';

class SearchUsers extends Component {

  onSearchFormSubmit({ email }) {
    this.props.userSearch(email);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='col-sm-6 form_div'>
        <h4>Search</h4>
        <form onSubmit={handleSubmit(this.onSearchFormSubmit.bind(this))}>
          <Field
            name='email'
            type='email'
            placeholder='user email'
            component={renderField}
          />

          <div className='form-group form_btns'>
            <Link to='#' className='btn btn-danger' onClick={() => this.props.closeSearch()}>Cancel</Link>
            <button type='submit' className='btn btn-success pull-right'>Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { userSearch })(reduxForm({
  form: 'search_form'
})(SearchUsers));
