import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as githubService from 'services/githubService';
import * as userStore from 'stores/userStore';
import * as loadingStore from 'stores/loadingStore';

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
  title: {
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector(loadingStore.get);
  const [token, setToken] = useState('');
  const [error, setError] = useState();
  const classes = useStyles();

  const onTokenChange = (event) => {
    setToken(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(loadingStore.set(true));

    let user, loginError;
    try {
      user = await githubService.fetchUser(token);
    } catch (err) {
      loginError = err.message;
    }

    dispatch(loadingStore.set(false));

    if (user && !user.scopes.some((scope) => scope.includes('repo'))) {
      loginError = 'Access token must have repo or public_repo scope';
    }

    if (!loginError) {
      dispatch(userStore.login(user));
      history.push(location.state?.from?.pathname || '/');
    } else {
      setError(loginError);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Provide a Github personal access token to continue
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="github_personal_access_token"
            name="github_personal_access_token"
            label="Github personal access token"
            type="password"
            autoComplete="github_personal_access_token"
            autoFocus
            value={token}
            onChange={onTokenChange}
            disabled={loading}
            error={error != null}
            helperText={error}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
