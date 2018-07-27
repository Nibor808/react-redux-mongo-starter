'use strict';
import * as account from '../controllers/account_controller';

export default (app) => {
  app.post('/sendpasswordreset', account.sendPasswordReset);
  app.post('/resetpasswordrequest', account.resetPassword);
  app.post('/updateemail', account.updateEmail);
  app.post('/getemail', account.getEmail);
  app.post('/changepassword', account.changePassword);
};
