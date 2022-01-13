import responseType from '../../components/users/response.json'

interface IActionType {
  type: 'GET_USERS' | 'SET_LOADING' | 'CLEAR_USERS'
  payload?: Array<typeof responseType>
}

interface IState {
  users: Array<typeof responseType>
  loading: boolean
}

const githubReducer = (state: IState, action: IActionType) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: [...action.payload!],
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
      }
    default:
      return state
  }
}

export default githubReducer
