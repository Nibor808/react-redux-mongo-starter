'use strict';
import './helpers/server/db';
import morgan from 'morgan';
import express from 'express';
import parser from 'body-parser';
import adminRoutes from './server/routes/admin_routes';
import accountRoutes from './server/routes/account_routes';
import authRoutes from './server/routes/auth_routes';
import logger from './helpers/logger';
import renderer from './helpers/renderer';
import createStore from './helpers/store';
import clientScriptNames from './webpack-assets.json';
import auth from 'basic-auth';
import compression from 'compression';

const port = process.env.PORT || 3000;
const app = express();

global.logger = logger;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(compression());

/* wire up routes */
authRoutes(app);
adminRoutes(app);
accountRoutes(app);

app.get('*', (req, res) => {
  const Credentials = auth(req);

  if (!Credentials || Credentials.name !== 'odr' || Credentials.pass !== process.env.HTTP_BASIC_AUTH) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required');
    res.sendStatus(401);
    res.end('Access denied');
  } else {
    const store = createStore();
    const context = {};

    /* pass req to the renderer to get the path into the StaticRouter */
    const html = renderer(req, store, clientScriptNames, context);

    /* context only has a url prop if there has been a redirect from react router */
    if (context.url) return res.redirect(301, context.url);

    /* we added this notFound prop in our 404 page */
    if (context.notFound) res.status(404);

    res.send(html);
  }
});

app.listen(port, () => {
  logger.info(`Listening on ${port}`);
});
