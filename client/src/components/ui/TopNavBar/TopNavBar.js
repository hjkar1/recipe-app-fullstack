import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TopNavMenu from './TopNavMenu';
import { logout } from '../../../store/actions/users';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  authLink: {
    color: 'inherit',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  navLink: {
    color: 'inherit',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  grow: {
    flexGrow: 1
  },
  active: {
    cursor: 'default'
  },
  activeNav: {
    cursor: 'default',
    fontWeight: 'bold'
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

export const TopNavBar = ({ children, logout }) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    setLoggingOut(true);
  };

  const handleMenuOpen = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  if (loggingOut) {
    return <Redirect to="/login" />;
  }

  const homepageLink = (
    <Link
      activeClassName={classes.active}
      underline="none"
      color="inherit"
      variant="h6"
      component={NavLink}
      to="/"
      exact
    >
      Recipes
    </Link>
  );

  const recipeManagementLinks = (
    <Fragment>
      <Link
        activeClassName={classes.activeNav}
        underline="none"
        component={NavLink}
        className={classes.navLink}
        to="/myrecipes"
      >
        My recipes
      </Link>
      <Link
        activeClassName={classes.activeNav}
        underline="none"
        component={NavLink}
        className={classes.navLink}
        to="/recipes/new"
      >
        New recipe
      </Link>
    </Fragment>
  );

  const unregisteredUserLinks = (
    <Fragment>
      <Link
        activeClassName={classes.active}
        underline="none"
        component={NavLink}
        className={classes.authLink}
        to="/login"
      >
        Login
      </Link>
      <Link
        activeClassName={classes.active}
        underline="none"
        component={NavLink}
        className={classes.authLink}
        to="/signup"
      >
        Signup
      </Link>
    </Fragment>
  );

  const logoutButton = (
    <Button className={classes.authLink} onClick={handleLogout}>
      Logout
    </Button>
  );

  const loggedIn = localStorage.getItem('loggedInUser');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {homepageLink}
          <div className={classes.grow} />
          {children}
          {loggedIn ? recipeManagementLinks : null}
          {loggedIn ? logoutButton : unregisteredUserLinks}
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu button"
            aria-owns={anchorEl ? 'menu' : undefined}
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <TopNavMenu
            anchorEl={anchorEl}
            loggedIn={loggedIn}
            handleClose={handleMenuClose}
            handleLogout={handleLogout}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

TopNavBar.propTypes = {
  children: PropTypes.node,
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(TopNavBar);
