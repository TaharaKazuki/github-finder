interface IActionType {
  type: 'SET_ALERT' | 'REMOVE_ALERT'
  payload?: { msg: string; type: string }
}

interface IState {
  msg: string
  type: string
}

const alertReducer = (state: IState | null, action: IActionType) => {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...action.payload!,
      }
    case 'REMOVE_ALERT':
      return null
    default:
      return state
  }
}

export default alertReducer
