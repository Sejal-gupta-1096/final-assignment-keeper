import React,{ useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/Face';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/AssignmentTurnedIn';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AuthContext from '../../context/auth/authContext'
import FaceIcon from '@material-ui/icons/Face';
import PublishIcon from '@material-ui/icons/Publish';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
const drawerWidth = 240;



function ResponsiveDrawer(props) {
    const authContext = useContext(AuthContext)
    const {user,isAuthenticated,logout} = authContext
    let name=''
    if(user){
        name = user.name
    }
    let greet = "Hello " +name
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleclick = ()=>{
    logout()
  }
  const drawer = (
    <div style={{backgroundColor:"#900c3f"}}>
      <div className={classes.toolbar} style={{backgroundColor:"#900c3f"}}/>
      <img src={require('./icon.jpg')} className="img-fluid"/>
      <Divider />
      <List style={{backgroundColor:"#900c3f"}} >
        <a href="/User/upload">
        <ListItem button key="Hello" style={{marginTop:"10%"}} id="makechange">
            <ListItemIcon > <PersonIcon style={{height:"35px",width:"35px",color:"#fff"}}/> </ListItemIcon>
            <ListItemText primary={greet} className="text-white"/>
        </ListItem>
        </a>
        
        <a href="/User/upload">
        <ListItem button key="Upload" style={{marginTop:"10%"}} id="makechange">
            <ListItemIcon > <PublishIcon style={{height:"35px",width:"35px",color:"#fff"}}/> </ListItemIcon>
            <ListItemText primary="Upload" className="text-white"/>
        </ListItem>
        </a>

        <a href="/User/recent">
        <ListItem button key="Assignments" style={{marginTop:"10%"}} id="makechange">
            <ListItemIcon> <AssignmentIcon style={{height:"35px",width:"35px",color:"#fff"}}/> </ListItemIcon>
            <ListItemText primary="Assignments" className="text-white"/>
        </ListItem>
        </a>

        <a href="/User/solutions">
        <ListItem button key="Solutions" style={{marginTop:"10%"}} id="makechange">
            <ListItemIcon> <AssignmentTurnedInIcon style={{height:"35px",width:"35px",color:"#fff"}}/> </ListItemIcon>
            <ListItemText primary="Solutions" className="text-white"/>
        </ListItem>
        </a>

        <a href="/login" onClick={handleclick}>
        <ListItem button key="Logout" style={{marginTop:"10%"}} id="makechange3">
            <ListItemIcon> <ExitToAppIcon style={{height:"35px",width:"35px",color:"#fff"}}/> </ListItemIcon>
            <ListItemText primary="Logout" className="text-white" />
        </ListItem>
        </a>

      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{backgroundColor:"#010a43"}}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
          <ControlCameraIcon fontSize="large"/> Eracost
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders" style={{backgroundColor:"#900c3f"}}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css" style={{backgroundColor:"#900c3f"}}>
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css" style={{backgroundColor:"#900c3f"}}>
          <Drawer style={{backgroundColor:"#900c3f"}}
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} >
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) => (
    {
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
