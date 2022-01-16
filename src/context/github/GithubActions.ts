const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const searchUser = async (text: string) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })
  const { items } = await response.json()
  return items
}

export const getUser = async (login: string) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })

  if (response.status === 404) {
    window.location.href = '/notfound'
  } else {
    const data = await response.json()
    return data
  }
}

export const getUserRepos = async (login: string) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: `10`,
  })

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })

  const data = await response.json()
  return data
}
