import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthContext from '../../context/auth/authContext'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AlertUI from '../layout/Alert'
import Spinner from '../layout/Spinner'
import Navbar from '../layout/Navbar'


export default function Register({ component: Component, ...rest }) {
    let history = useHistory();
    const authContext = useContext(AuthContext);
    var { OTPsent, msg, error, setLoading, loading } = authContext;
    var buttonText = 'Register'
    const classes = useStyles();
    useEffect(() => {

        setTimeout(() => {
            if (OTPsent === true) {
                history.push("/verification")
            }
        }, 6000);

    }, [OTPsent])
    const [state, setstate] = useState({
        name: '',
        email: '',
        password: '',
        college: '',
        country: '',
        phone: ''

    })
    const { name, email, phone, college, country, password } = state
    const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        if (name === '' || email === '' || phone === '' || college === '' || country === '' || password === '') {
            alert('Enter all the fields')
        }
        else {
            setLoading(true);
            await authContext.registerUser(state)
        }

    }

    return (
        <>
        <Navbar/>
        <Container className="card" style={{paddingBottom:"2%",marginTop:"2%"}}component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIcon style={{height:"50px",width:"50px"}}/>
                </Avatar>
                <Typography component="h1" variant="h5" style={{fontWeight:"bold",color:"black"}}>
                    REGISTER
        </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={onChange}
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                value={name || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={onChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                name='phone'
                                label="Phone"
                                value={phone || ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email || ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="country"
                                label="Country"
                                name="country"
                                value={country || ''}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="college"
                                label="College"
                                name="college"
                                value={college || ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password || ''}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        onClick={onSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        style={{fontWeight:"bold",backgroundColor:"#010a43",color:"#fff"}}
                    >
                        {buttonText}

                    </Button>

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
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2" style={{color:"blue"}}>
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
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
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        height:"80px",
        width:"80px"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
