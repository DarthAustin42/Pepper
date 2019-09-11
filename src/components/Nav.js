import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <h5 class="loginButtonText" onClick={() => props.display_form('login')}>Login</h5>
  );

  const logged_in_nav = (
    <h5 class="loginButtonText" onClick={props.handle_logout}>Logout</h5>
  );
  return <div class="loginButtonText">{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
