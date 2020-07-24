import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RepoCard from 'components/RepoCard';
import * as githubService from 'services/githubService';
import * as alertStore from 'stores/alertStore';
import * as loadingStore from 'stores/loadingStore';
import * as userStore from 'stores/userStore';
import * as reposStore from 'stores/reposStore';

export default function Home() {
  const user = useSelector(userStore.get);
  const repos = useSelector(reposStore.get);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (repos.length || !user.token) {
        return;
      }

      dispatch(loadingStore.set(true));

      const githubRepos = githubService.fetchRepos(user.token);
      const loading = [];

      for await (const repo of githubRepos) {
        if (!repo.active) {
          continue;
        }

        loading.push(
          githubService
            .fetchFile(user.token, repo, '.webedit.json')
            .then((file) => {
              const config = JSON.parse(file.text);
              dispatch(reposStore.add({ repo, config }));
            })
            .catch((error) =>
              error.message === 'Not Found' ||
              error.message === 'This repository is empty.'
                ? Promise.resolve()
                : Promise.reject(error)
            )
        );
      }

      try {
        await Promise.all(loading);
      } catch (error) {
        dispatch(alertStore.set({ message: error.message, severity: 'error' }));
      }

      dispatch(loadingStore.set(false));
    })();
  }, [user, repos, dispatch]);

  const cards = repos.flatMap(({ repo, config }) =>
    Object.entries(config).map(([fileName, settings]) => ({
      repo,
      fileName,
      settings,
      key: `${repo.owner}/${repo.name}/${fileName}`,
    }))
  );

  return cards.map((props) => <RepoCard {...props} />);
}
