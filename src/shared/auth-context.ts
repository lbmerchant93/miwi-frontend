import { createContext } from "react";

export interface User {
    isLoggedIn: boolean;
    id: string | undefined;
    displayName: string | null;
    photoURL: string | null;
    expectedDueDate: string | null;
    email: string | null;
    setExpectedDueDate: (newDueDate: string) => void;
    setDisplayName: (displayName: string | null) => void;
}

export const AuthContext = createContext<User>({ 
    isLoggedIn: false, 
    id: undefined,
    displayName: '',
    photoURL: '',
    expectedDueDate: null,
    email: '',
    setExpectedDueDate: () => {},
    setDisplayName: () => {}
})