import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript'; /* prevent XSS attacks */
import Routes from '../client/routes';

export default (req, store, clientScriptNames, context) => {
  const scriptOutput = (clientScriptNames) => {
    /*
      This method takes the object values and
      puts them in script tags, <script src='filename'></script>,
      in order to update the html with the new webpack output files
      THIS IS NECESSARY FOR CODE-SPLITTING, CACHE BUSTING WHEN HASHES ARE ADDED
    */

    return Object.entries(clientScriptNames).reduce((acc, curr) => {
      if (curr[1].js) {
        acc += `<script src='/${curr[1].js}'></script>`;
      }
      return acc;
    }, '');
  };

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        {renderRoutes(Routes)}
      </StaticRouter>
    </Provider>
  );

  const analytics = () => {
    if (process.env.NODE_ENV === 'production') {
      return (
        `<script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-105610531-1', 'auto');
          ga('send', 'pageview');
        </script>`
      );
    } else {
      return '';
    }
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
          <script src="http://apps.bdimg.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="keywords" content="">
        <meta name="description" content="">
        <meta name="author" content="">
        <!-- Facebook & Linkedin -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="">
        <meta property="og:title" content="">
        <meta property="og:description" content=""> <!-- At least 2 secntences long -->
        <meta property="og:image" content="">
        <meta property="og:image:width" content="1200"> <!-- minimum for high res devices-->
        <meta property="og:image:height" content="630"> <!-- minimum for high res devices-->
        <meta property="og:article:author" content="">
        <meta property="og:article:publisher" content="">
        <!-- Twitter -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@username" />
        <meta name="twitter:title" content="" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="" /> <!-- minimum dimensions 144x144 -->
        <meta name="twitter:image:alt" content="" />
        <!--<link rel="shortcut icon" href="" type="image/x-icon">
        <link rel="icon" href="" type="image/x-icon">-->
        <!-- Google Analytics -->
          ${analytics()}
        <!-- End google Analytics -->
        <link rel="stylesheet" href="/styles.css">
        <title>Ontario Divorce Resource</title>
      </head>
      <body>
      <noscript>
        You need to enable Javascript in order to use this app.
      </noscript>
        <div id='root' class='container'>${content}</div>
        <!-- Inject State -->
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        ${scriptOutput(clientScriptNames)}
      </body>
    </html>
  `;
};
