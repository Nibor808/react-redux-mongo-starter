import React from 'react';
import { Link } from 'react-router-dom';

export const notFoundRoute = ({ staticContext = {} }) => {
  staticContext.notFound = true;

  return (
    <div className='four_o_four_div'>
      <h1>
        Oops! You caught us.
      </h1>
      <p>
        We were about to send you to the page you were looking for but we got distracted by a bee.
      </p>
      <div className='bee' />
      <p>
        Actually you tried to get to a page that doesn't exist.
      </p>
      <p>
        Click the link below to go back to the home page.
      </p>
      <Link to='/'>Take me back home</Link>
    </div>
  );
};
