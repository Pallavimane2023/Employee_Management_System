import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation ,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ButtonAppBar() {
    const navigate = useNavigate();
    
    const handleLogout = ()=>{
        localStorage.removeItem('user');
        navigate("/");
      }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Management System
          </Typography>
          <Button color="inherit" onClick={handleLogout}>logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}