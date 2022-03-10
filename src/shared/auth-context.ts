import { createContext } from "react";

export interface User {
    isLoggedIn: boolean;
    id: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export const AuthContext = createContext<User>({ 
    isLoggedIn: false, 
    id: null,
    displayName: '',
    photoURL: ''
})