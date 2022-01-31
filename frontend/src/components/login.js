import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Homepage from "./homepage";

function LoggedIn(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Spraylog © '}
      <Link color="inherit" href="https://mui.com/">
        Future website link
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

class Login extends Component {
    state = {
        email: "",
        password: "",
        login: false,
    };

    handleEmail = e => { this.setState({ email: e.target.value }) }

    handlePassword = e => { this.setState({ password: e.target.value }) }

  // prettier-ignore
    handleSubmit = async () => {
		const url = "http://localhost:3001/users/login";
        try { 
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state)
            });
            const data = await response.json();
            console.log("this is login response data: ", data);
            const { login, errorCode } = data;
            if (!!login) {
                const { 
                    id, 
                    firstname, 
                    lastname, 
                    email, 
                    phone, 
                    coursename 
                } = data;
                this.props.changeLoginState({ 
                    login, 
                    id, 
                    firstname, 
                    lastname, 
                    email, 
                    phone, 
                    coursename 
                })
            };
            this.setState({
                login,
                errorCode
            })
        } catch (err) {
        console.log("there has been login error", err);
        }
    }

    saveToLocal() {
        const local = this.state.login;
        localStorage.setItem("login", JSON.stringify(local));
    }

    render() {
        const { login } = this.state;
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                //Going to use GIF or Picture of working application
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            />
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={this.handleEmail}
                        value={this.state.email}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={this.handlePassword}
                        value={this.state.password}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={this.handleSubmit}
                >
                    Sign In
                </Button>
                {!!login ? <Redirect to="/home" /> : Homepage}
                <Grid container justifyContent="flex-end">
                    <Grid item>
                    <Link onClick={() => window.location.replace('signup')} href="#" variant="body2"
                        >
                        Don't have an account? Register here
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            <LoggedIn sx={{ mt: 5 }} />
            </Container>
            </Grid>
        </ThemeProvider>
        );
    }
}
export default Login;