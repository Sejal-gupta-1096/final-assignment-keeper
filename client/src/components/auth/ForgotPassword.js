import React, { Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext'
import AlertUI from '../layout/Alert'
import Spinner from '../layout/Spinner'
import { useHistory } from 'react-router-dom';






export default function SignIn() {

    const authContext = useContext(AuthContext)
    const { forgotPassword, changePassword, msg, setLoading, error, loading } = authContext

    let history = useHistory();
    const classes = useStyles();
    const [state, setstate] = useState({
        email: '',
        OTP: '',
        password: ''
    })
    const { email, OTP, password } = state

    useEffect(() => {

        setTimeout(() => {
            if (msg === 'password changed successfully') {
                history.push("/login")
            }
        }, 3000);

    }, [msg])


    const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        forgotPassword(state)
    }
    const onSubmit1 = (e) => {
        e.preventDefault()
        setLoading(true)
        changePassword(state)
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
        </Typography>
                <form className={classes.form}>
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


                    {msg ? (
                        <Fragment>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="OTP"
                                label="OTP"
                                name="OTP"
                                value={OTP}
                                onChange={onChange}

                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="New Password"
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
                                color="primary"
                                className={classes.submit}
                                onClick={onSubmit1}
                            >
                                CONFIRM
                    </Button>
                        </Fragment>
                    ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={onSubmit}
                            >
                                Send OTP
                            </Button>)}

                </form>
                {error &&
                    <AlertUI msg={error} type='error' />
                }
                {msg &&
                    <AlertUI msg={msg} type='success' />
                }
                {
                    loading &&
                    <Spinner />
                }
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" >
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
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

