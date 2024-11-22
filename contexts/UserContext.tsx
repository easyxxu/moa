"use client";

import { User } from "@supabase/supabase-js";

import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

interface AuthUser {
  id: string | null;
  name: string | null;
  isLogin: boolean;
  userType: "LOGGED_OUT" | "BUYER" | "SELLER";
  moreUserData: User | null;
}

interface LoginAction {
  type: "LOGIN";
  payload: {
    id: string;
    name: string;
    userType: "BUYER" | "SELLER";
    moreUserData: User;
  };
}

interface LogoutAction {
  type: "LOGOUT";
}
interface UpdateAction {
  type: "UPDATE";
  payload: {
    name: string;
  };
}
type UserAction = LoginAction | LogoutAction | UpdateAction;

async function fetchUserData() {
  try {
    const res = await fetch("/api/auth/user");
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      throw new Error(`data.message`);
    }
  } catch (e) {
    console.log("Error fetching user data: ", e);
    return null;
  }
}

function userReducer(state: AuthUser, action: UserAction): AuthUser {
  switch (action.type) {
    case "LOGIN":
      console.log("Login");
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        userType: action.payload.userType,
        moreUserData: action.payload.moreUserData,
        isLogin: true,
      };
    case "LOGOUT":
      console.log("logout");
      return {
        ...state,
        id: null,
        name: null,
        userType: "LOGGED_OUT",
        isLogin: false,
        moreUserData: null,
      };
    case "UPDATE":
      return {
        ...state,
        name: action.payload.name,
      };
    default:
      throw new Error(`Unhandled action type :${action}`);
  }
}

const initialUser: AuthUser = {
  id: null,
  name: null,
  userType: "LOGGED_OUT",
  isLogin: false,
  moreUserData: null,
};

const UserContext = createContext(initialUser);
const UserDispatchContext = createContext<Dispatch<UserAction>>(() => null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState(initialUser);
  const [state, dispatch] = useReducer(userReducer, userData);

  useEffect(() => {
    async function loadUserData() {
      const data = await fetchUserData();
      if (data && data.userData) {
        const userPayload = {
          id: data.userData.user.id,
          name: data.userData.user.user_metadata.name,
          userType: data.userData.user.user_metadata.user_type,
          moreUserData: data.userData.user,
        };

        dispatch({ type: "LOGIN", payload: userPayload });
        setUserData({ ...userPayload, isLogin: true });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    }

    loadUserData();
  }, []);

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
