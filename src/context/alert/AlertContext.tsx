import { createContext, useReducer, ReactNode } from 'react'
import alertReducer from './AlertReducer'

export interface IAlertContext {
  alert: { msg: string; type: string } | null
  setAlert: (msg: string, type: string) => void
}

interface Props {
  children: ReactNode
}

const AlertContext = createContext<IAlertContext | undefined>(undefined)

export const AlertProvider = (props: Props) => {
  const { children } = props
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  const setAlert = (msg: string, type: string) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    })

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000)
  }

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
