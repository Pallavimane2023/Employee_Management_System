import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/api';
import LockIcon from '@mui/icons-material/Lock';
import TextField from "@mui/material/TextField";
import {Box ,Button}from "@mui/material";
import './login.css';

 const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ username, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate('/home');
    }
  };

  return (
    <div className='LoginPageContainer'>
      <div className='Container'>
        <h2><LockIcon/><br/> SIGN IN</h2>
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
      
        {error && <p>{error}</p>}
      </div >
    </div>
  );
};

export default LoginPage
