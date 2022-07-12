import { createContext } from "react";

export interface User {
    isLoggedIn: boolean;
    id: string | undefined;
    displayName: string | null;
    photoURL: string | null;
    expectedDueDate: string | null;
    email: string | null;
    goals?: {},
    setExpectedDueDate: (newDueDate: string) => void;
    setDisplayName: (displayName: string | null) => void;
    setGoals: (newGoals: {}) => void;
}

export const AuthContext = createContext<User>({ 
    isLoggedIn: false, 
    id: undefined,
    displayName: '',
    photoURL: '',
    expectedDueDate: null,
    email: '',
    goals: {},
    setExpectedDueDate: () => {},
    setDisplayName: () => {},
    setGoals: () => {}
})