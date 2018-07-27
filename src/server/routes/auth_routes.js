'use strict';
import * as auth from '../controllers/auth_controller';

export default (app) => {
  app.post('/signup', auth.signUpUser);
  app.post('/signin', auth.signInUser);
  app.post('/initialsave', auth.initialSave);
  app.post('/checkpassword', auth.checkPassword);
};
