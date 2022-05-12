import { createContext } from "react";

export interface User {
    isLoggedIn: boolean;
    id: string | undefined;
    displayName: string | null;
    photoURL: string | null;
    expectedDueDate: string | null;
    setExpectedDueDate: (newDueDate: string) => void;
    setDisplayNameOnCreate: (displayName: string) => void;
}

export const AuthContext = createContext<User>({ 
    isLoggedIn: false, 
    id: undefined,
    displayName: '',
    photoURL: '',
    expectedDueDate: null,
    setExpectedDueDate: () => {},
    setDisplayNameOnCreate: () => {}
})