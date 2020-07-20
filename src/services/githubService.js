const ROOT = 'https://api.github.com';
const ACCEPT = 'application/vnd.github.v3+json';

export async function fetchUser(token) {
  const response = await fetch(`${ROOT}/user`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: ACCEPT,
    },
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status}: ${payload}`);
  }

  return {
    name: payload.name || payload.login,
    avatar: payload.avatar_url,
    token,
    scopes: response.headers.get('x-oauth-scopes').split(', '),
  };
}
