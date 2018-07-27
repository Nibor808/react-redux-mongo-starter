import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ComposedComponent) => {
  class Authentication extends Component {

    render() {
      switch (this.props.authenticated) {
        case false:
          return <Redirect to='/' />;
        default:
          return <ComposedComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps({ auth }) {
    return {
      authenticated: auth.authenticated
    };
  }

  return connect(mapStateToProps)(Authentication);
};
