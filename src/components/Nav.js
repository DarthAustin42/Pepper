import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <h2 onClick={() => props.display_form('login')}>Login</h2>
  );

  const logged_in_nav = (
    <h2 onClick={props.handle_logout}>Logout</h2>
  );
  return <span class="navbar-text">{props.logged_in ? logged_in_nav : logged_out_nav}</span>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
