import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RepoCard from 'components/RepoCard';
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
        if (!repo.active) {
          continue;
        }

        loading.push(
          githubService
            .fetchFile(user.token, repo, '.webedit.json')
            .then((file) => {
              if (file?.text != null) {
                const config = JSON.parse(file.text);
                dispatch(addRepo({ repo, config }));
              }
            })
        );
      }

      await Promise.all(loading);
      dispatch(setLoading(false));
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
