"use client";

import { createContext, Dispatch, useContext, useReducer } from "react";

interface AuthUser {
  id: string | null;
  name: string | null;
  isLogin: boolean;
  user_type: "LOGGED_OUT" | "BUYER" | "SELLER";
}

const initialUser: AuthUser = {
  id: null,
  name: null,
  user_type: "LOGGED_OUT",
  isLogin: false,
};

interface LoginAction {
  type: "LOGIN";
  payload: {
    id: string;
    name: string;
    user_type: "BUYER" | "SELLER";
  };
}

interface LogoutAction {
  type: "LOGOUT";
}

type UserAction = LoginAction | LogoutAction;

function userReducer(state: AuthUser, action: UserAction): AuthUser {
  switch (action.type) {
    case "LOGIN":
      console.log("Login");
      localStorage.setItem(
        "userState",
        JSON.stringify({
          id: action.payload.id,
          name: action.payload.name,
          user_type: action.payload.user_type,
          isLogin: true,
        })
      );
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        user_type: action.payload.user_type,
        isLogin: true,
      };
    case "LOGOUT":
      console.log("logout");
      localStorage.setItem(
        "userState",
        JSON.stringify({
          id: null,
          name: null,
          user_type: "LOGGED_OUT",
          isLogin: false,
        })
      );
      return {
        ...state,
        id: null,
        name: null,
        user_type: "LOGGED_OUT",
        isLogin: false,
      };
    default:
      throw new Error(`Unhandled action type :${action}`);
  }
}

const UserContext = createContext(initialUser);
const UserDispatchContext = createContext<Dispatch<UserAction>>(() => null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const initialUser = localStorage.getItem("userState");
  const parsedUser = initialUser
    ? JSON.parse(initialUser)
    : {
        id: null,
        name: null,
        user_type: "LOGGED_OUT",
        isLogin: false,
      };
  const [state, dispatch] = useReducer(userReducer, parsedUser);

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUserState() {
  return useContext(UserContext);
}
export function useUserDispatch() {
  return useContext(UserDispatchContext);
}
