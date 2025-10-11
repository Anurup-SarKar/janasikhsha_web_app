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
  gap: theme.spacing(1), // Add consistent spacing between elements
}));
const NavButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Raleway, sans-serif',
  fontWeight: 400,
  fontSize: '0.85rem',
  color: theme.palette.primary.main,
  background: 'none',
  borderRadius: 8,
  padding: '6px 12px',
  margin: '0 1px',
  textTransform: 'none',
  letterSpacing: 0.3,
  minHeight: 50,
  maxWidth: 120,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  whiteSpace: 'pre-line', // Allow line breaks
  lineHeight: 1.2,
  '&:hover': {
    background: 'rgba(255, 127, 17, 0.08)',
    color: theme.palette.secondary.main,
    boxShadow: '0 2px 8px rgba(0, 91, 150, 0.2)',
  },
}));
const Brand = styled(Typography)(({ theme }) => ({
  fontFamily: 'Raleway, sans-serif',
  fontWeight: 900,
  fontSize: '1.3rem',
  color: theme.palette.primary.main,
  letterSpacing: 0.8,
  textShadow: '0 2px 8px rgba(0, 91, 150, 0.1)',
  flex: '0 0 auto',
  maxWidth: '300px',
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  minHeight: 40,
  minWidth: 0, // Allow text to shrink
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginRight: theme.spacing(2),
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
  { label: 'Memorumdam Of Association ', page: 'memorumdam' },
  { label: 'Authority of Organization & Staff Structure', page: 'authority' },
];

const confidentialMenuItems = [
  { label: 'Donation, CSR, FCRA', page: 'donationform' },
  { label: 'CCTV Live View', page: 'livecctv', requiresAuth: true },
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
  const [confidentialAnchorEl, setConfidentialAnchorEl] = React.useState(null);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [createUserMsg, setCreateUserMsg] = useState('');
  const [createUserError, setCreateUserError] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const navItems = [
    { label: 'What We\nDo', page: 'whatwedo' },
    { label: 'Latest\nProjects', page: 'latestprojects' },
    { label: 'Our\nAchievements', page: 'ourachievements' },
    { label: 'History of\nOrganization', page: 'history' },
    { label: 'Photo\nGallery', page: 'photogallery' },
    { label: 'Contact\nDetails', page: 'contact' },
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
  
  const handleConfidentialMenuOpen = (event) => setConfidentialAnchorEl(event.currentTarget);
  const handleConfidentialMenuClose = () => setConfidentialAnchorEl(null);

  // Handle confidential menu item click with authentication check
  const handleConfidentialMenuItemClick = (menuItem) => {
    handleConfidentialMenuClose();
    if (menuItem.requiresAuth && !isLoggedIn) {
      setLoginDialogOpen(true);
    } else {
      navigate(`/${menuItem.page}`);
    }
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
      <StyledAppBar position="static" elevation={2}>
        <StyledToolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: theme.palette.secondary.main, fontSize: 26 }} />
            </IconButton>
          )}
          <Brand component={RouterLink} to="/">Janasiksha Prochar Kendra</Brand>
          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2.5,
              height: '100%',
              flex: '0 1 auto',
              overflow: 'hidden',
              flexWrap: 'nowrap'
            }}>
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
                    sx={{ 
                      fontFamily: 'Raleway, sans-serif', 
                      color: theme.palette.primary.main, 
                      fontWeight: 400,
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 40
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>

              {navItems.map((item, index) => {
                // Insert Confidential Category dropdown before Photo Gallery
                if (item.page === 'photogallery') {
                  return (
                    <React.Fragment key={`confidential-${index}`}>
                      {/* Confidential Category Dropdown */}
                      <NavButton
                        aria-controls={confidentialAnchorEl ? 'confidential-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={confidentialAnchorEl ? 'true' : undefined}
                        onClick={handleConfidentialMenuOpen}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        Confidential Category
                      </NavButton>
                      <Menu
                        id="confidential-menu"
                        anchorEl={confidentialAnchorEl}
                        open={Boolean(confidentialAnchorEl)}
                        onClose={handleConfidentialMenuClose}
                        MenuListProps={{ 'aria-labelledby': 'confidential-menu-button' }}
                        sx={{ mt: 1 }}
                      >
                        {confidentialMenuItems.map((menuItem) => (
                          <MenuItem
                            key={menuItem.page}
                            onClick={() => handleConfidentialMenuItemClick(menuItem)}
                            sx={{ 
                              fontFamily: 'Raleway, sans-serif', 
                              color: theme.palette.primary.main, 
                              fontWeight: 400,
                              fontSize: '0.85rem',
                              textAlign: 'left',
                              display: 'flex',
                              alignItems: 'center',
                              minHeight: 40
                            }}
                          >
                            {menuItem.label}
                          </MenuItem>
                        ))}
                      </Menu>
                      {/* Photo Gallery Button */}
                      <NavButton key={item.page} component={RouterLink} to={`/${item.page}`}>{item.label}</NavButton>
                    </React.Fragment>
                  );
                }
                return (
                  <NavButton key={item.page} component={RouterLink} to={`/${item.page}`}>{item.label}</NavButton>
                );
              })}
              {isLoggedIn && (
                <NavButton onClick={handleOpenCreateUser}>Create User</NavButton>
              )}
            </Box>
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
                minHeight: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 24px',
                flexShrink: 0, // Prevent the button from shrinking
                whiteSpace: 'nowrap', // Prevent text wrapping
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
                minHeight: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 24px',
                flexShrink: 0, // Prevent the button from shrinking
                whiteSpace: 'nowrap', // Prevent text wrapping
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
                sx={{ 
                  pl: 2,
                  minHeight: 48,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ListItemText 
                  primary="About Us" 
                  primaryTypographyProps={{ 
                    sx: { 
                      fontFamily: 'Raleway, sans-serif', 
                      color: theme.palette.primary.main, 
                      fontWeight: 400,
                      textAlign: 'left',
                      lineHeight: 1.2
                    } 
                  }} 
                />
              </ListItem>
              {/* Render About Us submenus indented under About Us */}
              {drawerOpen && aboutMenuItems.map(item => (
                <ListItem
                  button
                  key={item.page}
                  component={RouterLink}
                  to={`/${item.page}`}
                  onClick={() => setDrawerOpen(false)}
                  sx={{ 
                    pl: 4,
                    minHeight: 44,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ 
                      sx: { 
                        fontFamily: 'Raleway, sans-serif', 
                        color: theme.palette.primary.main, 
                        fontWeight: 400,
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        lineHeight: 1.2
                      } 
                    }} 
                  />
                </ListItem>
              ))}

              {/* Other nav items */}
              {navItems.map((item, index) => {
                // Insert Confidential Category dropdown before Photo Gallery
                if (item.page === 'photogallery') {
                  return (
                    <React.Fragment key={`mobile-confidential-${index}`}>
                      {/* Confidential Category submenu for mobile */}
                      <ListItem
                        button
                        key="confidentialcategory-mobile"
                        onClick={() => setDrawerOpen(open => !open)}
                        sx={{ 
                          pl: 2,
                          minHeight: 48,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <ListItemText 
                          primary="Confidential Category" 
                          primaryTypographyProps={{ 
                            sx: { 
                              fontFamily: 'Raleway, sans-serif', 
                              color: theme.palette.primary.main, 
                              fontWeight: 400,
                              textAlign: 'left',
                              lineHeight: 1.2
                            } 
                          }} 
                        />
                      </ListItem>
                      {/* Render Confidential Category submenus indented under Confidential Category */}
                      {drawerOpen && confidentialMenuItems.map(menuItem => (
                        <ListItem
                          button
                          key={menuItem.page}
                          onClick={() => {
                            setDrawerOpen(false);
                            if (menuItem.requiresAuth && !isLoggedIn) {
                              setLoginDialogOpen(true);
                            } else {
                              navigate(`/${menuItem.page}`);
                            }
                          }}
                          sx={{ 
                            pl: 4,
                            minHeight: 44,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ListItemText 
                            primary={menuItem.label} 
                            primaryTypographyProps={{ 
                              sx: { 
                                fontFamily: 'Raleway, sans-serif', 
                                color: theme.palette.primary.main, 
                                fontWeight: 400,
                                fontSize: '0.9rem',
                                textAlign: 'left',
                                lineHeight: 1.2
                              } 
                            }} 
                          />
                        </ListItem>
                      ))}
                      {/* Photo Gallery Item */}
                      <ListItem
                        button
                        key={item.page}
                        component={RouterLink}
                        to={`/${item.page}`}
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                          minHeight: 56,
                          display: 'flex',
                          alignItems: 'center',
                          pl: 2
                        }}
                      >
                        <ListItemText 
                          primary={item.label.replace('\n', ' ')} 
                          primaryTypographyProps={{ 
                            sx: { 
                              fontFamily: 'Raleway, sans-serif', 
                              color: theme.palette.primary.main, 
                              fontWeight: 400,
                              textAlign: 'left',
                              lineHeight: 1.3,
                              whiteSpace: 'normal',
                              wordWrap: 'break-word'
                            } 
                          }} 
                        />
                      </ListItem>
                    </React.Fragment>
                  );
                }
                return (
                  <ListItem
                    button
                    key={item.page}
                    component={RouterLink}
                    to={`/${item.page}`}
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      minHeight: 56,
                      display: 'flex',
                      alignItems: 'center',
                      pl: 2
                    }}
                  >
                    <ListItemText 
                      primary={item.label.replace('\n', ' ')} 
                      primaryTypographyProps={{ 
                        sx: { 
                          fontFamily: 'Raleway, sans-serif', 
                          color: theme.palette.primary.main, 
                          fontWeight: 400,
                          textAlign: 'left',
                          lineHeight: 1.3,
                          whiteSpace: 'normal',
                          wordWrap: 'break-word'
                        } 
                      }} 
                    />
                  </ListItem>
                );
              })}
              <Divider sx={{ my: 1 }} />
              <ListItem 
                button 
                onClick={handleLoginLogout}
                sx={{
                  minHeight: 48,
                  display: 'flex',
                  alignItems: 'center',
                  pl: 2
                }}
              >
                <ListItemText 
                  primary={isLoggedIn ? 'Logout' : 'Login'} 
                  primaryTypographyProps={{ 
                    sx: { 
                      fontFamily: 'Raleway, sans-serif', 
                      color: theme.palette.secondary.main, 
                      fontWeight: 700,
                      textAlign: 'left',
                      lineHeight: 1.2
                    } 
                  }} 
                />
                {/* Removed trailing icons to show text only */}
              </ListItem>
              {isLoggedIn && (
                <ListItem 
                  button 
                  onClick={handleOpenCreateUser}
                  sx={{
                    minHeight: 48,
                    display: 'flex',
                    alignItems: 'center',
                    pl: 2
                  }}
                >
                  <ListItemText 
                    primary="Create User"
                    primaryTypographyProps={{ 
                      sx: { 
                        fontFamily: 'Raleway, sans-serif', 
                        color: theme.palette.primary.main, 
                        fontWeight: 500,
                        textAlign: 'left',
                        lineHeight: 1.2
                      } 
                    }}
                  />
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
