//

import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
// utils
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

// import { setItem, getItem } from '../utils/localStorage';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  loginSuccMsg: null,
  loginErrMsg: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      loginSuccMsg: null,
      loginErrMsg: null,
      user,
    };
  },
  LOGIN_LOAD: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    loginSuccMsg: null,
    loginErrMsg: null,
    regSuccMsg: null,
    regErrMsg: null,
  }),
  LOGIN: (state, action) => {
    const { user, message } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isInitialized: true,
      user,
      loginSuccMsg: message,
      loginErrMsg: null,
    };
  },
  LOGIN_ERROR: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      loginSuccMsg: null,
      loginErrMsg: message,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    loginSuccMsg: null,
    loginErrMsg: null,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      loginSuccMsg: null,
      loginErrMsg: null,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const user = JSON.parse(window.localStorage.getItem("userData"));

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    dispatch({
      type: "LOGIN_LOAD",
    });
    const response = await axios.post("/api/v1/login", {
      email,
      password,
    });

    const { data: user, status, message } = response.data;

    if (status === 1) {
      const accessToken = user?.access_token;

      window.localStorage.setItem("userEmail", JSON.stringify(email));
      window.localStorage.setItem("userPassword", JSON.stringify(password));
      window.localStorage.setItem("userData", JSON.stringify(user));

      setSession(accessToken);
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          message,
          isAuthenticated: true,
        },
      });
    } else {
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          message,
        },
      });
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post("/api/account/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
