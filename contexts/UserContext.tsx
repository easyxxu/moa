"use client";

import { fetchUserInfo, logOut } from "@/api/userApis";
import { User } from "@supabase/supabase-js";

import { createContext, useContext, useEffect, useReducer } from "react";

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
    const { status, message, data } = await fetchUserInfo();
    if (status === 200) {
      return data;
    } else {
      throw message;
    }
  } catch (e) {
    console.log("Error fetching user data: ", e);
    throw new Error(`${e}`);
  }
}

const initialUser: AuthUser = {
  id: null,
  name: null,
  isLogin: false,
  userType: "LOGGED_OUT",
  moreUserData: null,
};

function userReducer(state: AuthUser, action: UserAction): AuthUser {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        userType: action.payload.userType,
        moreUserData: action.payload.moreUserData,
        isLogin: true,
      };
    case "LOGOUT":
      return initialUser;

    case "UPDATE":
      return {
        ...state,
        name: action.payload.name,
      };
    default:
      throw new Error(`Unhandled action type :${action}`);
  }
}

const UserContext = createContext(initialUser);
const UserDispatchContext = createContext<{
  login: () => Promise<void>;
  logout: () => void;
  updateUser: (name: string) => void;
} | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialUser);

  async function loadUserData() {
    const data = await fetchUserData();
    if (data) {
      const userPayload = {
        id: data.id,
        name: data.user_metadata.name,
        userType: data.user_metadata.user_type,
        moreUserData: data,
      };
      dispatch({ type: "LOGIN", payload: userPayload });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }

  const login = async () => {
    await loadUserData();
  };

  const logout = async () => {
    await logOut();
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (name: string) => {
    dispatch({ type: "UPDATE", payload: { name } });
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={{ login, logout, updateUser }}>
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
