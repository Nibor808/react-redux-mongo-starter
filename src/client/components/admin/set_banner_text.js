import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../../helpers/client/render_field';
import { Link } from 'react-router-dom';
import { setBannerMessage } from '../../actions/admin_actions';
import { connect } from 'react-redux';

class SetBannerText extends Component {

  onBannerFormSubmit({ bannerText }) {
    this.props.setBannerMessage(bannerText);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='col-sm-8 form_div'>
        <h4>Set Banner Message</h4>
        <form onSubmit={handleSubmit(this.onBannerFormSubmit.bind(this))}>
          <Field
            name='bannerText'
            type='text'
            placeholder='message'
            component={renderField}
          />

          <div className='form-group form_btns'>
            <Link to='#' className='btn btn-danger' onClick={() => this.props.closeBanner()}>Done</Link>
            <button type='submit' className='btn btn-success pull-right'>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { setBannerMessage })(reduxForm({
  form: 'banner_form'
})(SetBannerText));
