import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class NoAuth extends Component {

  render() {
    return (
      <div className='landing_row'>
        <div className='col-sm-12 top_row'>
          <h2 className='text-center'>
            Top Row Message
          </h2>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatch
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(NoAuth);
