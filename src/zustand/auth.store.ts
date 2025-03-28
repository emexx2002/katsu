import { AxiosBasicCredentials } from "axios";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

type ROLE = "IBILE_ADMIN" | "IBILE_AMBASSADOR" | "IBILE_AGENT"

interface Auth {
  username: string;
  password: string;
}

interface UserProfile {
  id?: number;
  name?: string;
  email?: string;
  onboardingStep?: string;
  // Add other profile properties as needed
}

// State interface with only the state properties
interface AuthStateProps {
  loggedIn: boolean;
  token: string | null;
  profile: any | null;
  email: string | null;
  role: ROLE | null | string;
}

// Full interface including actions
interface AuthState extends AuthStateProps {
  setLoggedIn: (value: boolean) => void;
  setToken: (token: string) => void;
  setUserProfile: (profile: any) => void;
  setUserRoleType: (role: string) => void;
  logout: () => void;
  setEmail: (email: string) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    combine(
      {
        loggedIn: false,
        token: null,
        profile: null,
        email: null,
        role: null as ROLE | null | string,
      } as AuthStateProps,
      (set) => ({
        setLoggedIn: (value: boolean) => {
          set({ loggedIn: value });
        },
        setToken: (token: string) => {
          set({ token });
        },
        setUserProfile: (profile: any) => {
          set({ profile, loggedIn: true });
        },
        setUserRoleType: (role: string) => {
          set({ role });
        },
        logout: () => {
          set({
            loggedIn: false,
            token: null,
            profile: null,
            role: null,
          });
          if (useAuth.getState().loggedIn) window.location.replace("/login")
        },
        setEmail: (email: string) => {
          set({ email });
        },
      })
    ),
    {
      name: "ecap-auth",
      getStorage: () => sessionStorage,
    }
  )
);

export const AuthActions = {
  logout: () => {
    useAuth.getState().logout();
  },
  setToken: (token: string) => {
    useAuth.getState().setToken(token);
  },
  setProfile: (profile: any) => {
    useAuth.getState().setUserProfile(profile);
  },
  setRole: (role: string) => {
    useAuth.setState({ role });
  },
  setEmail: (email: string) => {
    useAuth.getState().setEmail(email);
  },
};
