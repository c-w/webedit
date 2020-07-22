import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Form from '@rjsf/material-ui';
import Layout from 'components/Layout';
import { selectRepos } from 'stores/reposStore';

export default function Edit() {
  const { owner, name, fileName } = useParams();
  const repos = useSelector(selectRepos);

  const config = repos.find(
    ({ repo }) => repo.owner === owner && repo.name === name
  ).config[fileName];

  return (
    <Layout>
      <Form schema={config.schema} uiSchema={config.ui} />
    </Layout>
  );
}
