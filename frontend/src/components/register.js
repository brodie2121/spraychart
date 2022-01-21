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

function Registered(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Registered © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    coursename: "",
    createdAccount: false
  };

  handleFirstName = e => { this.setState({ firstname: e.target.value }) }

  handleLastName = e => { this.setState({ lastname: e.target.value }) }

  handlePhone = e => { this.setState({ phone: e.target.value }) }

  handleEmail = e => { this.setState({ email: e.target.value }) }

  handlePassword = e => { this.setState({ password: e.target.value }) }

  handleCourseName = e => { this.setState({ name: e.target.value }) }

  // prettier-ignore
  handleSubmit = async () => {
		const url = "http://localhost:3000/users/signup";
		const formData = this.state;
		console.log("this is form data: ", formData);
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		});
		if (response.ok) {
			this.setState({
				accountCreated: true
			});
		}
		console.log("account created: ", this.state.accountCreated);
	  };

  render() {
    const { UserRegistered } = this.state;
 return (
    <ThemeProvider theme={theme}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="lastname"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="coursename"
                  required
                  fullWidth
                  id="coursename"
                  label="Course Name"
                  autoFocus
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
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Registered sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
}
export default Register;