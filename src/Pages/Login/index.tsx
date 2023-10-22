import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const defaultTheme = createTheme();

    const handleSubmit = () => {

    }

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
              <img src="/img/Phillys_Logo.png" />
            <Typography component="h1" variant="h4" sx={{ mt: 4 }}>
              Log in to your account
            </Typography>
            <Typography component="h5" variant="h6" sx={{ color: '#5c5c5c' }}>
              Welcome back! Please enter your details.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="Email"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{
                    backgroundColor: '#ededed',
                    borderRadius: "31.5px",
                    '& .MuiOutlinedInput-root': {
                        border: 'none', 
                        borderRadius: "30px"
                      },
                      '& .MuiInput-underline:after': {
                        borderBottom: 'none',
                        borderColor: '#FF6347', 
                      },
                      '& .MuiInputBase-input:focus': {
                        borderColor: '#FF6347', 
                      },
                  }}
                  inputProps={{
                    sx: {
                      color: '#5c5c5c',
                      marginLeft: "10px",
                    },
                  }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                sx={{
                    backgroundColor: '#ededed',
                    borderRadius: "31.5px",
                    '& .MuiOutlinedInput-root': {
                        border: 'none', 
                        borderRadius: "30px"
                      },
                      '& .MuiInput-underline:after': {
                        borderBottom: 'none',
                        borderColor: '#FF6347', 
                      },
                      '& .MuiInputBase-input:focus': {
                        borderColor: '#FF6347', 
                      },
                  }}
                  inputProps={{
                    sx: {
                      color: '#5c5c5c',
                      marginLeft: "10px",
                    },
                  }}
              />

             <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                  <FormControlLabel
                    control={<Checkbox value="remember" color="error"  />}
                    label="Remember me"
                    sx={{ color: "#FF6347" }}
                />
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" sx={{ color: "#FF6347", textDecoration: "none" }} onClick={() => navigate('/forgot-password')}>
                    Forgot Password?
                  </Link>
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#FF6347",
                    color: "#fff",
                    borderRadius: "31.5px",
                    height: "40px",
                    '&:hover': {
                      backgroundColor: "#dc442e",
                    },
                  }}
              >
                Sign In
              </Button>
             
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    )
}

export default Login;