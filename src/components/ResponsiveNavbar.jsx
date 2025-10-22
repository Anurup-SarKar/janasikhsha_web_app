// ResponsiveNavbar.jsx
// Responsive navigation bar for the Janasiksha Prochar Kendra website.
// Handles navigation, login/logout, and drawer menu for mobile.
// Follows accessible, modern, and empathetic design.

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Box, Divider, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Removed LoginIcon/LogoutIcon imports
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import theme from '../theme';
import LoginDialog from './LoginDialog';
import LoginForm from './LoginForm';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo1 from '../assets/images/Logo-1.jpg';
import Logo2 from '../assets/images/Logo-2.png';

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
  paddingLeft: theme.spacing(1), // Reduced padding for mobile
  paddingRight: theme.spacing(1), // Ensure equal right padding
  gap: theme.spacing(0.5), // Reduced gap for mobile
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    gap: theme.spacing(1),
  },
}));
const NavButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Raleway, sans-serif',
  fontWeight: 400,
  fontSize: '0.95rem', // Increased from 0.85rem to 0.95rem
  color: theme.palette.primary.main,
  background: 'none',
  borderRadius: 8,
  padding: '6px 16px', // Increased horizontal padding for better spacing
  margin: '0 4px', // Increased margin for consistent spacing between items
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
const BrandContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.25), // Very small gap on mobile
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 'none',
  flex: '1 1 auto',
  maxWidth: '100%',
  minWidth: 0,
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(1.5),
    maxWidth: '400px',
  },
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: 22, // Much smaller for mobile
  height: 22,
  borderRadius: '50%',
  objectFit: 'cover',
  flexShrink: 0, // Prevent logo from shrinking
  border: `2px solid ${theme.palette.primary.light}`,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.up('sm')]: {
    width: 35,
    height: 35,
  },
  [theme.breakpoints.up('md')]: {
    width: 40,
    height: 40,
  },
}));

const Brand = styled(Typography)(({ theme }) => ({
  fontFamily: 'Raleway, sans-serif',
  fontWeight: 900,
  fontSize: '0.7rem', // Even smaller for two-line mobile layout
  color: theme.palette.primary.main,
  letterSpacing: 0.3,
  textShadow: '0 2px 8px rgba(0, 91, 150, 0.1)',
  overflow: 'hidden',
  minWidth: 0, // Allow text to shrink
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center align the text lines
  justifyContent: 'center', // Vertically center the text
  textAlign: 'center', // Center text alignment
  lineHeight: 1.1, // Tighter line height for mobile
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.95rem', // Larger font on tablets and up
    letterSpacing: 0.8,
    flexDirection: 'row', // Single line on larger screens
  },
  lineHeight: 1, // Adjust line height for better vertical centering
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
  { label: 'Memorandum of Association', page: 'memorandum' },
  { label: 'Authority of Organization', page: 'ourteam' },
  { label: 'Staff Structure', page: 'staff' },
];

const schemeMenuItems = [
  { label: 'Running Scheme', page: 'latestprojects' },
  { label: 'Proposed Scheme', page: 'proposedscheme' },
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
  const [schemeAnchorEl, setSchemeAnchorEl] = React.useState(null);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  // States for mobile submenu expansion
  const [aboutSubmenuExpanded, setAboutSubmenuExpanded] = useState(false);
  const [schemeSubmenuExpanded, setSchemeSubmenuExpanded] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [createUserMsg, setCreateUserMsg] = useState('');
  const [createUserError, setCreateUserError] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const navItems = [
    { label: 'What We\nDo', page: 'whatwedo' },
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

  const handleSchemeMenuOpen = (event) => setSchemeAnchorEl(event.currentTarget);
  const handleSchemeMenuClose = () => setSchemeAnchorEl(null);

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
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => {
              setDrawerOpen(true);
              setAboutSubmenuExpanded(false);
              setSchemeSubmenuExpanded(false);
            }}>
              <MenuIcon sx={{ color: theme.palette.secondary.main, fontSize: 26 }} />
            </IconButton>
          )}
          <BrandContainer component={RouterLink} to="/">
            <LogoImage 
              src={Logo1} 
              alt="Janasiksha Prochar Kendra Logo 1"
              sx={{ 
                width: { xs: 28, sm: 35, md: 40 },
                height: { xs: 28, sm: 35, md: 40 },
                flexShrink: 0
              }}
            />
            <Brand>
              JANASIKSHA PRACHAR KENDRA
            </Brand>
            <LogoImage 
              src={Logo2} 
              alt="Janasiksha Prochar Kendra Logo 2"
              sx={{ 
                width: { xs: 28, sm: 35, md: 40 },
                height: { xs: 28, sm: 35, md: 40 },
                flexShrink: 0
              }}
            />
          </BrandContainer>
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
                      fontSize: '0.95rem', // Increased to match main menu items
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

              {/* What We Do - first nav item */}
              <NavButton component={RouterLink} to="/whatwedo">What We{'\n'}Do</NavButton>

              <NavButton
                aria-controls={schemeAnchorEl ? 'scheme-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={schemeAnchorEl ? 'true' : undefined}
                onClick={handleSchemeMenuOpen}
                endIcon={<ArrowDropDownIcon />}
              >
                Our Scheme
              </NavButton>
              <Menu
                id="scheme-menu"
                anchorEl={schemeAnchorEl}
                open={Boolean(schemeAnchorEl)}
                onClose={handleSchemeMenuClose}
                MenuListProps={{ 'aria-labelledby': 'scheme-menu-button' }}
                sx={{ mt: 1 }}
              >
                {schemeMenuItems.map((item) => (
                  <MenuItem
                    key={item.page}
                    component={RouterLink}
                    to={`/${item.page}`}
                    onClick={handleSchemeMenuClose}
                    sx={{ 
                      fontFamily: 'Raleway, sans-serif', 
                      color: theme.palette.primary.main, 
                      fontWeight: 400,
                      fontSize: '0.95rem',
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

              {/* Remaining nav items */}
              {navItems.slice(1).map((item) => (
                <NavButton key={item.page} component={RouterLink} to={`/${item.page}`}>{item.label}</NavButton>
              ))}
              {isLoggedIn && (
                <NavButton onClick={handleOpenCreateUser}>Create User</NavButton>
              )}
            </Box>
          )}
          {isLoggedIn && (
            // Show Logout button only when logged in
            <Button
              onClick={handleLoginLogout}
              sx={{
                ml: 0.5, // Reduced margin-left to move button more to the left
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
          )}
          {/* Login Dialog (from separate component) */}
          <LoginDialog
            open={loginDialogOpen}
            onClose={() => setLoginDialogOpen(false)}
            onLogin={() => { setLoginDialogOpen(false); onLogin && onLogin(); }}
          />
        </StyledToolbar>
        <Drawer anchor="left" open={drawerOpen} onClose={() => {
          setDrawerOpen(false);
          setAboutSubmenuExpanded(false);
          setSchemeSubmenuExpanded(false);
        }}>
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
                onClick={() => setAboutSubmenuExpanded(expanded => !expanded)}
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
                <ExpandMoreIcon 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontSize: '1.2rem',
                    transform: aboutSubmenuExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out'
                  }} 
                />
              </ListItem>
              {/* Render About Us submenus indented under About Us */}
              {aboutSubmenuExpanded && aboutMenuItems.map(item => (
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
                        fontSize: '0.95rem', // Increased to match main menu items
                        textAlign: 'left',
                        lineHeight: 1.2
                      } 
                    }} 
                  />
                </ListItem>
              ))}

              {/* What We Do - first nav item */}
              <ListItem
                button
                component={RouterLink}
                to="/whatwedo"
                onClick={() => setDrawerOpen(false)}
                sx={{
                  minHeight: 56,
                  display: 'flex',
                  alignItems: 'center',
                  pl: 2
                }}
              >
                <ListItemText 
                  primary="What We Do" 
                  primaryTypographyProps={{ 
                    sx: { 
                      fontFamily: 'Raleway, sans-serif', 
                      color: theme.palette.primary.main, 
                      fontWeight: 400,
                      textAlign: 'left',
                      lineHeight: 1.3
                    } 
                  }} 
                />
              </ListItem>

              {/* Our Scheme submenu for mobile */}
              <ListItem
                button
                key="ourscheme"
                onClick={() => setSchemeSubmenuExpanded(expanded => !expanded)}
                sx={{ 
                  pl: 2,
                  minHeight: 48,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ListItemText 
                  primary="Our Scheme" 
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
                <ExpandMoreIcon 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontSize: '1.2rem',
                    transform: schemeSubmenuExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out'
                  }} 
                />
              </ListItem>
              {/* Render Our Scheme submenus indented under Our Scheme */}
              {schemeSubmenuExpanded && schemeMenuItems.map(item => (
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
                        fontSize: '0.95rem',
                        textAlign: 'left',
                        lineHeight: 1.2
                      } 
                    }} 
                  />
                </ListItem>
              ))}

              {/* Remaining nav items */}
              {navItems.slice(1).map((item) => (
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
              ))}
              {isLoggedIn && (
                <>
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
                      primary="Logout" 
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
                  </ListItem>
                </>
              )}
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