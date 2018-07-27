import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpEmail from './signupemail';
import SignUpPass from './signuppass';

class FormWizardSignUp extends Component {

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }

  nextPage() {
    if (this.props.error) {
      return;
    } else {
      this.setState({ page: this.state.page + 1 });
    }
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;

    return (
      <section className='row'>
        {page === 1 && <SignUpEmail onSubmit={this.nextPage} />}
        {page === 2 && <SignUpPass onSubmit={onSubmit} previousPage={this.previousPage} />}
      </section>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    error: auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWizardSignUp);
