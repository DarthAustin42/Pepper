import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <h5 onClick={() => props.display_form('login')}>Login</h5>
  );

  const logged_in_nav = (
    <h5 onClick={props.handle_logout}>Logout</h5>
  );
  return <span class="navbar-text">{props.logged_in ? logged_in_nav : logged_out_nav}</span>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
