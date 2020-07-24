import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';
import SyncIcon from '@material-ui/icons/Sync';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as alertStore from 'stores/alertStore';
import * as loadingStore from 'stores/loadingStore';
import * as userStore from 'stores/userStore';
import * as reposStore from 'stores/reposStore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Layout({ children }) {
  const alert = useSelector(alertStore.get);
  const user = useSelector(userStore.get);
  const loading = useSelector(loadingStore.get);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onOpenDrawer = () => {
    if (user != null) {
      setDrawerOpen(true);
    }
  };

  const onCloseDrawer = ({ type, key }) => {
    if (type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
      return;
    }

    setDrawerOpen(false);
  };

  const onCloseAlert = () => {
    dispatch(alertStore.clear());
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={onOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={onCloseDrawer}>
            <div
              className={classes.list}
              role="presentation"
              onClick={onCloseDrawer}
              onKeyDown={onCloseDrawer}
            >
              <List>
                <ListItem button onClick={() => dispatch(reposStore.clear())}>
                  <ListItemIcon>
                    <SyncIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sync account" />
                </ListItem>
                <ListItem button onClick={() => dispatch(userStore.logout())}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <Typography variant="h6" className={classes.title}>
            <Link to="/home" color="inherit" component={RouterLink}>
              WebEdit
            </Link>
          </Typography>
          <Avatar alt={user?.name} src={user?.avatar} />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <LinearProgress
          style={{ visibility: loading ? 'visible' : 'hidden' }}
        />
        <Container maxWidth="lg" className={classes.container}>
          {children}
          <Snackbar
            open={alert != null}
            autoHideDuration={6000}
            onClose={onCloseAlert}
          >
            {alert && (
              <Alert onClose={onCloseAlert} severity={alert.severity}>
                {alert.message}
              </Alert>
            )}
          </Snackbar>
        </Container>
      </main>
    </div>
  );
}
