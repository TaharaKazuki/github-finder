import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const Axios = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
})

export const searchUser = async (text: string) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await Axios.get(`/search/users?${params}`)
  return response.data.items
}

export const getUserAndRepos = async (login: string) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: '10',
  })

  const [user, repos] = await Promise.all([
    Axios.get(`/users/${login}`),
    Axios.get(`/users/${login}/repos?${params}`),
  ])
  return { user: user.data, repos: repos.data }
}
