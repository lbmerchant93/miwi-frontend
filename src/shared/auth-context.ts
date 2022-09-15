import { createContext, Dispatch, SetStateAction } from "react";

export interface Goals {
    id: string;
    waterIntakeGoal: number;
    proteinIntakeGoal: number;
    exerciseGoal: number;
    kegelsGoal: number;
    garlandPoseGoal: number;
}

export interface User {
    isLoggedIn: boolean;
    id: string | undefined;
    displayName?: string | null;
    photoURL: string | null;
    expectedDueDate: string | null;
    email: string | null;
    goals: Goals,
    setUserId: Dispatch<SetStateAction<string | undefined>>
    setExpectedDueDate: Dispatch<SetStateAction<string | null>>
    setDisplayName: Dispatch<SetStateAction<string | null | undefined>>
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
        id: '',
        waterIntakeGoal: 20,
        proteinIntakeGoal: 20,
        exerciseGoal: 20,
        kegelsGoal: 20,
        garlandPoseGoal: 20
    },
    setUserId: () => {},
    setExpectedDueDate: () => {},
    setDisplayName: () => {},
    setGoals: () => {}
})