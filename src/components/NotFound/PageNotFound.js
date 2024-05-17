
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css'

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='pageNotFound'>

      <h3>404 page not found</h3>
      <p style={{ alignSelf: "center" }}>We are sorry but the page you are looking for does not exist.</p>
      <Button onClick={() => navigate('/home')}>
        Back
      </Button >
    </div>
  )
}

export default PageNotFound