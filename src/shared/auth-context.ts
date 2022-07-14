import { createContext } from "react";

export interface Goals {
    waterIntakeGoal?: number | null;
    proteinIntakeGoal?: number | null;
    exerciseGoal?: number | null;
    kegelsGoal?: number | null;
    garlandPoseGoal?: number | null;
}

export interface User {
    isLoggedIn: boolean;
    id: string | undefined;
    displayName: string | null;
    photoURL: string | null;
    expectedDueDate: string | null;
    email: string | null;
    goals: [Goals],
    setExpectedDueDate: (newDueDate: string) => void;
    setDisplayName: (displayName: string | null) => void;
    setGoals: (newGoals: [Goals]) => void;
}

export const AuthContext = createContext<User>({ 
    isLoggedIn: false, 
    id: undefined,
    displayName: '',
    photoURL: '',
    expectedDueDate: null,
    email: '',
    goals: [{
        waterIntakeGoal: null,
        proteinIntakeGoal: null,
        exerciseGoal: null,
        kegelsGoal: null,
        garlandPoseGoal: null
    }],
    setExpectedDueDate: () => {},
    setDisplayName: () => {},
    setGoals: () => {}
})