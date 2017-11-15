import React from 'react';  
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

const Header = () => {  
  return (
    <nav>
      <IndexLink to="/" 
        activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/login" activeClassName="active">login</Link>
    </nav>
  );
};

export default Header;  