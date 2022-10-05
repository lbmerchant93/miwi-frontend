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
    isLoadingUser: boolean;
    id: string | undefined;
    displayName?: string | null;
    photoURL: string | null;
    expectedDueDate: string | null;
    email: string | null;
    goals: Goals;
    setUserId: Dispatch<SetStateAction<string | undefined>>;
    setExpectedDueDate: Dispatch<SetStateAction<string | null>>;
    setDisplayName: Dispatch<SetStateAction<string | null | undefined>>;
    setGoals: Dispatch<SetStateAction<Goals>>;
    setIsLoadingUser: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<User>({ 
    isLoggedIn: false, 
    isLoadingUser: false,
    id: undefined,
    displayName: '',
    photoURL: '',
    expectedDueDate: null,
    email: '',
    goals: {
        id: '',
        waterIntakeGoal: 70,
        proteinIntakeGoal: 70,
        exerciseGoal: 30,
        kegelsGoal: 100,
        garlandPoseGoal: 10
    },
    setUserId: () => {},
    setExpectedDueDate: () => {},
    setDisplayName: () => {},
    setGoals: () => {},
    setIsLoadingUser: () => {}
})