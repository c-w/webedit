import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Form from '@rjsf/material-ui';
import * as jmespath from 'jmespath';
import { selectRepos } from 'stores/reposStore';
import { selectUser } from 'stores/userStore';
import { set as setLoading, selectLoading } from 'stores/loadingStore';
import * as githubService from 'services/githubService';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  submit: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Edit() {
  const classes = useStyles();
  const { owner, name, fileName } = useParams();
  const user = useSelector(selectUser);
  const repos = useSelector(selectRepos);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const config = repos.find(
    ({ repo }) => repo.owner === owner && repo.name === name
  ).config[fileName];

  const onChange = (event) => {
    setFormData(event.formData);
  };

  const onCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const onSubmit = async () => {
    if (loading) {
      return;
    }

    dispatch(setLoading(true));

    const repo = { owner, name };
    const file = await githubService.fetchFile(user.token, repo, fileName);

    const fileJson = JSON.parse(file.text);
    const fileItems = config.path
      ? jmespath.search(fileJson, config.path)
      : fileJson;
    fileItems.unshift(formData);
    const newFile = { text: JSON.stringify(fileJson, null, 2), sha: file.sha };

    await githubService.saveFile(user.token, repo, fileName, newFile);

    setFormData(null);
    setIsAlertOpen(true);
    dispatch(setLoading(false));
  };

  return (
    <>
      <Form
        disabled={loading}
        schema={config.schema}
        uiSchema={config.ui}
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <Fab
          variant="extended"
          type="submit"
          color="primary"
          disabled={loading}
          className={classes.submit}
        >
          <SaveIcon className={classes.icon} /> Save
        </Fab>
      </Form>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={6000}
        onClose={onCloseAlert}
      >
        <Alert onClose={onCloseAlert} severity="success">
          Saved item
        </Alert>
      </Snackbar>
    </>
  );
}
