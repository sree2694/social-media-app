import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Fade,
  CircularProgress,
} from '@mui/material';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data);
      localStorage.setItem('username', username); // store for post authoring
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in timeout={800}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f0f2f5"
      >
        <Paper elevation={6} sx={{ padding: 4, width: 350 }}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Login to Social Media
          </Typography>

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.2 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Don't have an account? <a href="/register">Register</a>
          </Typography>
        </Paper>
      </Box>
    </Fade>
  );
}
