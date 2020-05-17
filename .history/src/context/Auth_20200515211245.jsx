import React, { useReducer, useContext } from 'react'

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1
    case 'DECREASE':
      return state - 1
    case 'INCREASE_BY':
      return state + action.payload
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, 0)
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export const useCount = () => useContext(AuthStateContext)
export const useDispatchCount = () => useContext(AuthDispatchContext)