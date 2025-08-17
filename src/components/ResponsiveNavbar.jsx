// ResponsiveNavbar.jsx
// Responsive navigation bar for the Janasiksha Prochar Kendra website.
// Updated for single-page navigation via smooth scrolling.

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Box, Divider, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';
import theme from '../theme';

// Styled components for a clean, branded look
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderBottom: `3px solid ${theme.palette.secondary.main}`,
  boxShadow: '0 2px 12px rgba(0, 91, 150, 0.15)',
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
}));

const aboutMenuItems = [
  { label: 'Who We Are', id: 'whoweare' },
  { label: 'Our Manifesto', id: 'ourmanifesto' },
  { label: 'Our Team', id: 'ourteam' },
];

/**
 * ResponsiveNavbar component
 * Shows navigation links, login/logout, and a drawer menu for mobile.
 * @param {Object} props
 * @param {Function} props.onLogin - Callback for login
 * @param {Function} props.onLogout - Callback for logout
 * @param {boolean} props.isLoggedIn - User authentication state
 * @param {Function} props.onNavigate - Callback for navigation
 * @returns {JSX.Element} The rendered navigation bar
 */
export default function ResponsiveNavbar({ isLoggedIn, onLogin, onLogout, onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [aboutAnchorEl, setAboutAnchorEl] = React.useState(null);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [createUserMsg, setCreateUserMsg] = useState('');
  const [createUserError, setCreateUserError] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navItems = [
    { label: 'About Us', id: 'aboutus' },
    { label: 'What We Do', id: 'whatwedo' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'News Room', id: 'newsroom' },
    { label: 'Case History', id: 'casehistory' },
    { label: 'Support Us', id: 'supportus' },
    { label: 'Contact', id: 'contact' },
  ];
  if (isLoggedIn) navItems.push({ label: 'Live CCTV', id: 'livecctv' });

  // Blur active element for accessibility
  function blurActiveElement() {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  }

  // Handle login/logout button
  function handleLoginLogout() {
    blurActiveElement();
    setDrawerOpen(false); // Ensure drawer closes on login/logout
    if (isLoggedIn) {
      onLogout();
    } else {
      // Open login modal (handled by App)
      onLogin?.();
    }
  }

  const handleAboutMenuOpen = (event) => setAboutAnchorEl(event.currentTarget);
  const handleAboutMenuClose = () => setAboutAnchorEl(null);

  // Handle navigation to section
  const handleNav = (id) => {
    onNavigate?.(id);
    setDrawerOpen(false);
    handleAboutMenuClose();
  };

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
  <StyledAppBar position="fixed" elevation={2}>
// NOTE: If your main content is hidden behind the navbar, add a top margin or padding to your main content (e.g., marginTop: 72 or 80px)
        <StyledToolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: theme.palette.secondary.main, fontSize: 26 }} />
            </IconButton>
          )}
          <Brand onClick={() => handleNav('home')}>Janasiksha Prochar Kendra</Brand>
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
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    sx={{ fontFamily: 'Raleway, sans-serif', color: theme.palette.primary.main, fontWeight: 500 }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
              {navItems.filter(item => item.label !== 'About Us').map(item => (
                <NavButton key={item.id} onClick={() => handleNav(item.id)}>{item.label}</NavButton>
              ))}
              {isLoggedIn && (
                <NavButton onClick={handleOpenCreateUser}>Create User</NavButton>
              )}
            </>
          )}
          <IconButton color="inherit" onClick={handleLoginLogout} sx={{ ml: 2 }} aria-label={isLoggedIn ? 'Logout' : 'Login'}>
            {isLoggedIn ? <LogoutIcon sx={{ color: theme.palette.secondary.main }} /> : <LoginIcon sx={{ color: theme.palette.secondary.main }} />}
          </IconButton>
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
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontFamily: 'Raleway, sans-serif', color: theme.palette.primary.main, fontWeight: 500 } }} />
                </ListItem>
              ))}
              {/* Other nav items except About Us */}
              {navItems.filter(item => item.label !== 'About Us').map(item => (
                <ListItem
                  button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                >
                  <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontFamily: 'Raleway, sans-serif', color: theme.palette.primary.main, fontWeight: 500 } }} />
                </ListItem>
              ))}
              <Divider sx={{ my: 1 }} />
              <ListItem button onClick={handleLoginLogout}>
                <ListItemText primary={isLoggedIn ? 'Logout' : 'Login'} primaryTypographyProps={{ sx: { fontFamily: 'Raleway, sans-serif', color: theme.palette.secondary.main, fontWeight: 700 } }} />
                {isLoggedIn ? <LogoutIcon sx={{ color: theme.palette.secondary.main }} /> : <LoginIcon sx={{ color: theme.palette.secondary.main }} />}
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
