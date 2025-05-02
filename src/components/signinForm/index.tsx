import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
} from '@mui/material';
import { signIn } from '../../api/aws-backend-apis';
import { LoginResp, SignInType } from '../../types/interfaces';
import { SessionContext } from '../../contexts/sessionContext';
import { useNavigate } from 'react-router-dom';


export const LoginForm: React.FC = () => {
  const { control, handleSubmit , formState : { errors} } = useForm<SignInType>();
 const { isLoggedIn, setLoggedInTrue } = useContext(SessionContext)
 const navigate = useNavigate();

  const [open, setOpen] = useState(false); 

  const styles = {
    snack: {
      mt: 8, 
      mr: 2,
      maxWidth: '350px',
      zIndex: 1300
    },
  };
  
  const handleSnackClose = () => {
      setOpen(false);
    };

  const onSubmit =  async (data: SignInType) => {
  
    try {
      const response = await signIn(data);
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.username);
      setLoggedInTrue()
      navigate("/")
      
    } catch (err) {
      console.log("Login error:", err);
    }
    
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
         onClose={handleSnackClose}
      ></Snackbar>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: 'username is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="email"
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {errors.email && 
      <Typography variant='h5' component="p">
{errors.email.message}
      </Typography>
      }
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: 'Password is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
        {errors.password && 
      <Typography variant='h5' component="p">
        {errors.password.message}
        </Typography>
      }
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;
