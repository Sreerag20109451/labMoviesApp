import React from 'react';
import { Box, Typography, Paper } from '@mui/material'; // Make sure path is correct
import LoginForm from '../components/signinForm';

const SignInPage: React.FC = () => {




  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
    >
      <Paper elevation={6} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Welcome Back 👋
        </Typography>
        <Typography variant="body2" textAlign="center" mb={4}>
          Sign in to continue to your dashboard
        </Typography>
        <LoginForm />
      </Paper>
    </Box>
  );
};

export default SignInPage;
