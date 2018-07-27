import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <footer className='row'>
      <ul className='footer_list col-sm-12'>
        <li>
          <Link to='#' target='_blank'>A Link</Link>
        </li>
        <li>
          <Link to='#'>Another Link</Link>
        </li>
        <li>
          <Link to='/#'>Contact Us</Link>
        </li>
      </ul>
    </footer>
  );
};
