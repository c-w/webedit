import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'components/Layout';
import * as githubService from 'services/githubService';
import { set as setLoading } from 'stores/loadingStore';
import { selectUser } from 'stores/userStore';
import { add as addRepo, selectRepos } from 'stores/reposStore';

export default function Home() {
  const user = useSelector(selectUser);
  const repos = useSelector(selectRepos);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (repos.length || !user.token) {
        return;
      }

      dispatch(setLoading(true));

      const githubRepos = githubService.fetchRepos(user.token);
      const loading = [];

      for await (const repo of githubRepos) {
        loading.push(
          githubService
            .fetchFile(user.token, repo, '.webedit.json')
            .then((text) => {
              if (text != null) {
                const config = JSON.parse(text);
                dispatch(addRepo({ repo, config }));
              }
            })
        );
      }

      await Promise.all(loading);
      dispatch(setLoading(false));
    })();
  }, [user, repos, dispatch]);

  return (
    <Layout>
      <ul>
        {repos.map(({ repo, config }) => (
          <li key={repo.name}>
            {repo.name} {Object.keys(config)[0]}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
