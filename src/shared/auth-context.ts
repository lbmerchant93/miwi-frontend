import { createContext, Dispatch, SetStateAction } from "react";

export interface Goals {
    waterIntakeGoal: number | null;
    proteinIntakeGoal: number | null;
    exerciseGoal: number | null;
    kegelsGoal: number | null;
    garlandPoseGoal: number | null;
}

export interface User {
    isLoggedIn: boolean;
    id: string | undefined;
    displayName: string | null;
    photoURL: string | null;
    expectedDueDate: string | null;
    email: string | null;
    goals: Goals,
    setUserId: Dispatch<SetStateAction<string | undefined>>
    setExpectedDueDate: Dispatch<SetStateAction<string | null>>
    setDisplayName: Dispatch<SetStateAction<string | null>>
    setGoals: Dispatch<SetStateAction<Goals>>
}

export const AuthContext = createContext<User>({ 
    isLoggedIn: false, 
    id: undefined,
    displayName: '',
    photoURL: '',
    expectedDueDate: null,
    email: '',
    goals: {
        waterIntakeGoal: null,
        proteinIntakeGoal: null,
        exerciseGoal: null,
        kegelsGoal: null,
        garlandPoseGoal: null
    },
    setUserId: () => {},
    setExpectedDueDate: () => {},
    setDisplayName: () => {},
    setGoals: () => {}
})