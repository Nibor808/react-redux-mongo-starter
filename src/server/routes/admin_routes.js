'use strict';
import * as admin from '../controllers/admin_controller';

export default (app) => {
  app.get('/allusers', admin.getAllUsers);
  app.post('/sendadminemail', admin.sendAdminEmail);
  app.post('/adminsigninas', admin.signInAs);
  app.post('/banner', admin.setBannerMessage);
  app.post('/clearbanner', admin.clearBannerMessage);
  app.post('/setadminstatus', admin.setAdminStatus);
  app.post('/usersearch', admin.userFromSearch);
  app.get('/getlogs', admin.getLogs);
  app.get('/getbannermessage', admin.getBannerMessage);
};
