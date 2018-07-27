import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyAccount from './my_account';
import NoAuth from './no_auth';

class Landing extends Component {

  renderSection() {
    const { user, adminUser } = this.props;

    if (user || adminUser) {
      return <MyAccount />;
    } else {
      return <NoAuth />;
    }
  }

  render() {
    return (
      <div className='row'>
        {this.renderSection()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    adminUser: auth.adminUser
  };
};


export default connect(mapStateToProps)(Landing);
