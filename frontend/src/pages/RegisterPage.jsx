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

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', { username, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Username may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in timeout={800}>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f7f8fa">
        <Paper elevation={6} sx={{ padding: 4, width: 350 }}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Register an Account
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
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Already have an account? <a href="/login">Login</a>
          </Typography>
        </Paper>
      </Box>
    </Fade>
  );
}
