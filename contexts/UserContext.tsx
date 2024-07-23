"use client";

import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface AuthUser {
  id: string | null;
  isLogin: boolean;
  user_type: "LOGGED_OUT" | "BUYER" | "SELLER";
}

const initialUser: AuthUser = {
  id: null,
  user_type: "LOGGED_OUT",
  isLogin: false,
};

interface LoginAction {
  type: "LOGIN";
  payload: {
    id: string;
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
      return {
        ...state,
        id: action.payload.id,
        user_type: action.payload.user_type,
        isLogin: true,
      };
    case "LOGOUT":
      console.log("logout");
      return {
        ...state,
        id: null,
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
  const storedUser = localStorage.getItem("userState") || null;
  const initialState = storedUser ? JSON.parse(storedUser) : initialUser;
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(state));
  }, [state]);
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
