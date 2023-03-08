//

import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

// utils
import axios from "../utils/axios";
import {
  // isValidToken,
  setSession,
} from "../utils/jwt";

//
// import { PATH_AFTER_LOGIN } from "../config";

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
  REGISTER_LOAD: (state, action) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    loginSuccMsg: null,
    loginErrMsg: null,
    regSuccMsg: null,
    regErrMsg: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      isInitialized: true,
      loginSuccMsg: null,
      loginErrMsg: null,
      user,
    };
  },
  REGISTER_ERROR: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      loginSuccMsg: null,
      loginErrMsg: message,
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
  // const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (
          accessToken
          // validation function is not working ...
          // && isValidToken(accessToken)
        ) {
          setSession(accessToken);

          const response = await axios.get("/auth/my-account");
          const { user } = response.data;

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

    // eslint-disable-next-line
    initialize();
  }, []);

  const login = async (email, password) => {
    dispatch({
      type: "LOGIN_LOAD",
    });
    const response = await axios.post("/auth/login", {
      email,
      password,
    });

    const { data: userData, status, message } = response.data;

    if (status === 1) {
      const accessToken = userData?.accessToken;

      window.localStorage.setItem("userEmail", JSON.stringify(email));
      window.localStorage.setItem("userPassword", JSON.stringify(password));
      window.localStorage.setItem("userData", JSON.stringify(userData?.user));

      setSession(accessToken);
      dispatch({
        type: "LOGIN",
        payload: {
          user: userData?.user,
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
    dispatch({ type: "REGISTER_LOAD" });
    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
        username: `${firstName} ${lastName}`,
      });
      const { accessToken, user, status, message } = response.data;

      if (status === 1) {
        window.localStorage.setItem("accessToken", accessToken);
        dispatch({
          type: "REGISTER",
          payload: {
            user,
          },
        });
      } else {
        dispatch({ type: "REGISTER_ERROR", payload: { message } });
      }
    } catch (error) {
      dispatch({ type: "REGISTER_ERROR", payload: { message: error.message } });
      console.log("error", error);
    }
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
