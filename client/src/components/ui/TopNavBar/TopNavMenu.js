import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';

const TopNavMenu = ({ anchorEl, handleClose, handleLogout, loggedIn }) => (
  <Menu
    id="menu"
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    {!loggedIn ? (
      <MenuItem>
        <NavLink to="/login" style={{ textDecoration: 'none', color: 'black' }}>
          Login
        </NavLink>
      </MenuItem>
    ) : null}
    {!loggedIn ? (
      <MenuItem>
        <NavLink
          to="/signup"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          Signup
        </NavLink>
      </MenuItem>
    ) : null}
    {loggedIn ? (
      <MenuItem>
        <NavLink
          to="/myrecipes"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          My recipes
        </NavLink>
      </MenuItem>
    ) : null}
    {loggedIn ? (
      <MenuItem>
        <NavLink
          to="/recipes/new"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          New recipe
        </NavLink>
      </MenuItem>
    ) : null}
    {loggedIn ? <MenuItem onClick={handleLogout}>Logout</MenuItem> : null}
  </Menu>
);

TopNavMenu.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  loggedIn: PropTypes.string
};

export default TopNavMenu;
