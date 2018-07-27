import React from 'react';
import UpdatePass from '../auth/update_password';
import UpdateEmail from '../auth/update_email';

export default () => {
  return [
    <UpdateEmail key='ACEmail' />,
    <UpdatePass key='ACPass' />
  ];
};
