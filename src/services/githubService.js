const ROOT = 'https://api.github.com';
const ACCEPT = 'application/vnd.github.v3+json';
const PAGE_SIZE = 50;

export async function fetchFile(token, repo, file) {
  const response = await fetch(`${ROOT}/repos/${repo.name}/contents/${file}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: ACCEPT,
    },
  });

  if (response.status === 404) {
    return null;
  }

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message);
  }

  return atob(payload.content);
}

export async function* fetchRepos(token) {
  let url = `${ROOT}/user/repos?sort=pushed&per_page=${PAGE_SIZE}`;

  while (url) {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: ACCEPT,
      },
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message);
    }

    for (const repo of payload) {
      yield {
        name: repo.full_name,
      };
    }

    const link = response.headers.get('link');
    url = link.match(/<(?<url>[^>]+)>;\s*rel="next"/)?.groups?.url;
  }
}

export async function fetchUser(token) {
  const response = await fetch(`${ROOT}/user`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: ACCEPT,
    },
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message);
  }

  return {
    name: payload.name || payload.login,
    avatar: payload.avatar_url,
    token,
    scopes: response.headers.get('x-oauth-scopes').split(', '),
  };
}
