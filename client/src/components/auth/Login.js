import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthContext from '../../context/auth/authContext'
import AlertUI from '../layout/Alert'
import Spinner from '../layout/Spinner'
import Navbar from '../layout/Navbar'


export default function Login(props) {
    const authContext = useContext(AuthContext)
    const { user, loginUser, error, msg, setLoading, loading, isAuthenticated } = authContext

    useEffect(() => {
        if (user) {
            props.history.push('/User/upload')
        }
        if (error == "Invalid Credentials") {
            alert("Invalid Creadentials")
        }
    }, [error, user, props.history])


    const classes = useStyles();
    const [state, setstate] = useState({
        email: '',
        password: ''
    })
    const { email, password } = state

    const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            alert("Please enter all Fields")
        }
        else {
            setLoading(true)
            loginUser(state)
        }


    }
    return (
        <>
            <Navbar />
            <Container className="card" style={{ paddingBottom: "2%", marginTop: "3%" }} component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonIcon style={{ height: "50px", width: "50px" }} />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ fontWeight: "bold",color:"black" }}>
                        LOGIN
        </Typography>
                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={onChange}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="Secondary"
                            className={classes.submit}
                            onClick={onSubmit}
                            style={{ fontWeight: "bold", backgroundColor: "#010a43", color: "#fff" }}
                        >
                            LOGIN
          </Button>
                        {error &&
                            <AlertUI msg={error} type='error' />
                        }
                        {msg &&
                            <AlertUI msg={msg} type='success' />
                        }
                        {
                            loading &&
                            <Spinner mt={3} />
                        }
                        <Grid container mt={3}>
                            <Grid item xs>
                                <Link href="/forgotPassword" variant="body2" style={{color:"blue"}}>
                                    Forgot password?
              </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2" style={{color:"blue"}}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );

}


function Copyright() {


    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Eracost
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: "#ff2e63",
        height: "80px",
        width: "80px"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));