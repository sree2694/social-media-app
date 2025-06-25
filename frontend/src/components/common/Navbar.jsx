import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Slide,
  useScrollTrigger,
  IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <HideOnScroll>
      <AppBar position="sticky" color="primary" elevation={3}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              SocialApp
            </Typography>

            {token && (
              <>
                <IconButton component={Link} to="/chat" color="inherit">
                  <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton component={Link} to="/profile/me" color="inherit">
                  <PersonIcon />
                </IconButton>
              </>
            )}
          </Box>

          <Box>
            {token ? (
              <Button
                onClick={handleLogout}
                color="error"
                variant="outlined"
                size="small"
                endIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  color="inherit"
                  startIcon={<AppRegistrationIcon />}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
