import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode"

const initialState = {
  user: null
}

if(localStorage.getItem("jwt-token")) {
  const decoded = jwtDecode(localStorage.getItem("jwt-token"))
  if(decoded.exp * 1000 < Date.now()) {
    initialState.user = null
  } else {
    initialState.user = decoded
  }
} 

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwt-token", userData.token)
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwt-token")
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export {AuthContext, AuthProvider}
