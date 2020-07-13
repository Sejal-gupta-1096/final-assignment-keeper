import React, { useState,useEffect } from 'react';
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
import AlertUI from '../layout/Alert'
import Spinner from '../layout/Spinner'
import { useHistory } from 'react-router-dom';
import Navbar from '../layout/Navbar'
export default function Verification(props) {
    
    

    const authContext = useContext(AuthContext);
    const { verifyUser, error, msg, loading, setLoading ,isVerified,logout} = authContext

    useEffect(() => {

       if(isVerified){
           setTimeout(()=>{
            logout()
            props.history.push('/login')
           },2000)
       }

    }, [isVerified])

    const classes = useStyles();
    const [state, setstate] = useState({
        email: '',
        token: ''
    })
    const { token, email } = state
    const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (email === '' || token === '') {
            alert('Enter all the fields')
        }
        else {
            setLoading(true)
            await authContext.verifyUser(state)

        }

    }
    return (
        <>
        <Navbar/>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Verification
        </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>


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
                                id="OTP"
                                label="OTP"
                                name="token"
                                value={token || ''}

                            />
                        </Grid>

                    </Grid>
                    <Button
                        onClick={onSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        style={{fontWeight:"bold",backgroundColor:"#010a43",color:"#fff"}}
                    >
                        Verify Account
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
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
