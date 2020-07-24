import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Form from '@rjsf/material-ui';
import * as jmespath from 'jmespath';
import * as alertStore from 'stores/alertStore';
import * as reposStore from 'stores/reposStore';
import * as userStore from 'stores/userStore';
import * as loadingStore from 'stores/loadingStore';
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
  const user = useSelector(userStore.get);
  const repos = useSelector(reposStore.get);
  const loading = useSelector(loadingStore.get);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();

  const config = repos.find(
    ({ repo }) => repo.owner === owner && repo.name === name
  ).config[fileName];

  const onChange = (event) => {
    setFormData(event.formData);
  };

  const onSubmit = async () => {
    if (loading) {
      return;
    }

    dispatch(loadingStore.set(true));

    const repo = { owner, name };
    let alert, file;
    try {
      file = await githubService.fetchFile(user.token, repo, fileName);
    } catch (error) {
      alert = { message: error.message, severity: 'error' };
    }

    if (file) {
      const fileJson = JSON.parse(file.text);
      const fileItems = config.path
        ? jmespath.search(fileJson, config.path)
        : fileJson;
      fileItems.unshift(formData);

      const newFile = {
        text: JSON.stringify(fileJson, null, 2),
        sha: file.sha,
      };

      try {
        await githubService.saveFile(user.token, repo, fileName, newFile);
      } catch (error) {
        alert = { message: error.message, severity: 'error' };
      }
    }

    if (!alert) {
      setFormData(null);
      alert = { message: 'Item saved', severity: 'success' };
    }

    dispatch(alertStore.set(alert));
    dispatch(loadingStore.set(false));
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
    </>
  );
}
