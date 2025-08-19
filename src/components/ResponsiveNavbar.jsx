// ResponsiveNavbar.jsx
// Responsive navigation bar for the Janasiksha Prochar Kendra website.
// Handles navigation, login/logout, and drawer menu for mobile.
// Follows accessible, modern, and empathetic design.

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Box, Divider, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Removed LoginIcon/LogoutIcon imports
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import theme from '../theme';
import LoginDialog from './LoginDialog';
import LoginForm from './LoginForm';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Styled components for a clean, branded look
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderBottom: `3px solid ${theme.palette.secondary.main}`,
  boxShadow: '0 2px 12px rgba(0, 91, 150, 0.15)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  zIndex: 1201, // above drawer and content
}));
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));
const NavButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Raleway, sans-serif',
  fontWeight: 500,
  fontSize: '0.95rem',
  color: theme.palette.primary.main,
  background: 'none',
  borderRadius: 8,
  padding: '8px 18px',
  margin: '0 2px',
  textTransform: 'none',
  letterSpacing: 0.5,
  '&:hover': {
    background: 'rgba(255, 127, 17, 0.08)',
    color: theme.palette.secondary.main,
    boxShadow: '0 2px 8px rgba(0, 91, 150, 0.2)',
  },
}));
const Brand = styled(Typography)(({ theme }) => ({
  fontFamily: 'Raleway, sans-serif',
  fontWeight: 900,
  fontSize: '1.5rem',
  color: theme.palette.primary.main,
  letterSpacing: 1,
  textShadow: '0 2px 8px rgba(0, 91, 150, 0.1)',
  flexGrow: 1,
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 'none',
  // Remove any visible border/outline when the brand link is focused/active/hovered
  '&:focus, &:active, &:hover': {
    textDecoration: 'none',
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
  },
}));

const aboutMenuItems = [
  { label: 'Who We Are', page: 'whoweare' },
  { label: 'Our Manifesto', page: 'ourmanifesto' },
  { label: 'Our Team', page: 'ourteam' },
];

/**
 * ResponsiveNavbar component
 * Shows navigation links, login/logout, and a drawer menu for mobile.
 * @param {Object} props
 * @param {Function} props.onLogin - Callback for login
 * @param {Function} props.onLogout - Callback for logout
 * @param {boolean} props.isLoggedIn - User authentication state
 * @returns {JSX.Element} The rendered navigation bar
 */
export default function ResponsiveNavbar({ isLoggedIn, onLogin, onLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [aboutAnchorEl, setAboutAnchorEl] = React.useState(null);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [createUserMsg, setCreateUserMsg] = useState('');
  const [createUserError, setCreateUserError] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const navItems = [
    { label: 'About Us', page: 'aboutus' },
    { label: 'What We Do', page: 'whatwedo' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'News Room', page: 'newsroom' },
    { label: 'Case History', page: 'casehistory' },
    { label: 'Support Us', page: 'supportus' },
    { label: 'Contact', page: 'contact' },
  ];
  if (isLoggedIn) navItems.push({ label: 'Live CCTV', page: 'livecctv' });

  // Blur active element for accessibility
  function blurActiveElement() {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  }

  // Handle login/logout button
  function handleLoginLogout(e) {
    blurActiveElement();
    setDrawerOpen(false); // Ensure drawer closes on login/logout
    if (isLoggedIn) {
      onLogout && onLogout();
      setLoginDialogOpen(false);
      navigate('/');
    } else {
      setLoginDialogOpen(true);
    }
  }

  const handleAboutMenuOpen = (event) => setAboutAnchorEl(event.currentTarget);
  const handleAboutMenuClose = () => setAboutAnchorEl(null);

  // Handle create user dialog open/close
  const handleOpenCreateUser = () => { setCreateUserOpen(true); setNewUser({ username: '', password: '' }); setCreateUserError(''); };
  const handleCloseCreateUser = () => setCreateUserOpen(false);

  // Handle create user form change
  const handleCreateUserChange = e => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  // Handle create user submit
  const handleCreateUserSubmit = e => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) {
      setCreateUserError('Username and password are required.');
      return;
    }
    // Store in localStorage (simulate server-side for this demo)
    let users = JSON.parse(localStorage.getItem('jpk_users') || '{}');
    if (users[newUser.username]) {
      setCreateUserError('Username already exists.');
      return;
    }
    users[newUser.username] = newUser.password;
    localStorage.setItem('jpk_users', JSON.stringify(users));
    setCreateUserMsg('User created successfully!');
    setCreateUserOpen(false);
  };

  return (
    <>
      <StyledAppBar position="static" elevation={2}>
        <StyledToolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: theme.palette.secondary.main, fontSize: 26 }} />
            </IconButton>
          )}
          <Brand component={RouterLink} to="/">Janasiksha Prochar Kendra</Brand>
          {!isMobile && (
            <>
              <NavButton
                aria-controls={aboutAnchorEl ? 'about-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={aboutAnchorEl ? 'true' : undefined}
                onClick={handleAboutMenuOpen}
                endIcon={<ArrowDropDownIcon />}
              >
                About Us
              </NavButton>
              <Menu
                id="about-menu"
                anchorEl={aboutAnchorEl}
                open={Boolean(aboutAnchorEl)}
                onClose={handleAboutMenuClose}
                MenuListProps={{ 'aria-labelledby': 'about-menu-button' }}
                sx={{ mt: 1 }}
              >
                {aboutMenuItems.map((item) => (
                  <MenuItem
                    key={item.page}
                    component={RouterLink}
                    to={`/${item.page}`}
                    onClick={handleAboutMenuClose}
                    sx={{ fontFamily: 'Raleway, sans-serif', color: theme.palette.primary.main, fontWeight: 500 }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
              {navItems.filter(item => item.label !== 'About Us').map(item => (
                <NavButton key={item.page} component={RouterLink} to={`/${item.page}`}>{item.label}</NavButton>
              ))}
              {isLoggedIn && (
                <NavButton onClick={handleOpenCreateUser}>Create User</NavButton>
              )}
            </>
          )}
          {isLoggedIn ? (
            // Replace icon with text button for Logout
            <Button
              onClick={handleLoginLogout}
              sx={{
                ml: 2,
                color: '#fff',
                backgroundColor: theme.palette.primary.main,
                fontWeight: 700,
                fontFamily: 'Raleway, sans-serif',
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 2px 8px rgba(0, 91, 150, 0.18)',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              aria-label="Logout"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={handleLoginLogout}
              sx={{
                ml: 2,
                color: '#fff',
                backgroundColor: theme.palette.primary.main,
                fontWeight: 700,
                fontFamily: 'Raleway, sans-serif',
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 2px 8px rgba(0, 91, 150, 0.18)',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              aria-label="Login"
            >
              Login
            </Button>
          )}
          {/* Login Dialog (from separate component) */}
          <LoginDialog
            open={loginDialogOpen}
            onClose={() => setLoginDialogOpen(false)}
            onLogin={() => { setLoginDialogOpen(false); onLogin && onLogin(); }}
          />
        </StyledToolbar>
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 250, bgcolor: theme.palette.background.paper, height: '100%' }} role="presentation">
            <Box sx={{ p: 2, bgcolor: theme.palette.secondary.main, color: '#fff', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700 }}>Janasiksha Prochar Kendra Menu</Typography>
            </Box>
            <Divider />
            <List>
              {/* About Us submenu for mobile */}
              <ListItem
                button
                key="aboutus"
                onClick={() => setDrawerOpen(open => !open)}
                sx={{ pl: 2 }}
              >
                <ListItemText primary="About Us" primaryTypographyProps={{ sx: { fontFamily: 'Raleway, sans-serif', color: theme.palette.primary.main, fontWeight: 500 } }} />
              </ListItem>
              {/* Render About Us submenus indented under About Us */}
              {drawerOpen && aboutMenuItems.map(item => (
                <ListItem
                  button
                  key={item.page}
                  component={RouterLink}
                  to={`/${item.page}`}
                  onClick={() => setDrawerOpen(false)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontFamily: 'Raleway, sans-serif', color: theme.palette.primary.main, fontWeight: 500 } }} />
                </ListItem>
              ))}
              {/* Other nav items except About Us */}
              {navItems.filter(item => item.label !== 'About Us').map(item => (
                <ListItem
                  button
                  key={item.page}
                  component={RouterLink}
                  to={`/${item.page}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontFamily: 'Raleway, sans-serif', color: theme.palette.primary.main, fontWeight: 500 } }} />
                </ListItem>
              ))}
              <Divider sx={{ my: 1 }} />
              <ListItem button onClick={handleLoginLogout}>
                <ListItemText primary={isLoggedIn ? 'Logout' : 'Login'} primaryTypographyProps={{ sx: { fontFamily: 'Raleway, sans-serif', color: theme.palette.secondary.main, fontWeight: 700 } }} />
                {/* Removed trailing icons to show text only */}
              </ListItem>
              {isLoggedIn && (
                <ListItem button onClick={handleOpenCreateUser}>
                  <ListItemText primary="Create User" />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </StyledAppBar>
      {/* Create User Dialog */}
      <Dialog open={createUserOpen} onClose={handleCloseCreateUser}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleCreateUserSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField label="Username" name="username" value={newUser.username} onChange={handleCreateUserChange} required autoFocus />
            <TextField label="Password" name="password" type="password" value={newUser.password} onChange={handleCreateUserChange} required />
            {createUserError && <Alert severity="error">{createUserError}</Alert>}
            <DialogActions>
              <Button onClick={handleCloseCreateUser}>Cancel</Button>
              <Button type="submit" variant="contained">Create</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar open={!!createUserMsg} autoHideDuration={4000} onClose={() => setCreateUserMsg('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setCreateUserMsg('')} severity="success" sx={{ width: '100%' }}>{createUserMsg}</Alert>
      </Snackbar>
    </>
  );
}
