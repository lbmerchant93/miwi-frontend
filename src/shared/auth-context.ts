import { createContext } from "react";

export interface User {
    isLoggedIn: boolean;
    userId: string | null;
    displayName: string | null;
    photoURL: string | null;
    logout: any;
}

export const AuthContext = createContext<User>({ 
    isLoggedIn: false, 
    userId: null,
    displayName: '',
    photoURL: '',
    logout: () => {}
})