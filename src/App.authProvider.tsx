import React, { useState } from 'react';
import { AuthContext, Goals } from './shared/auth-context';
import { 
    getAuth, 
    signOut, 
    setPersistence, 
    browserLocalPersistence, 
    onAuthStateChanged
} from 'firebase/auth';
import { useUser } from './api/users/user';

export const getAuthToken = () => localStorage.getItem('token');

interface AuthProviderProps {}

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence);
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [displayName, setDisplayName] = useState<string | null | undefined>('');
    const [photoURL, setPhotoURL] = useState<string | null>('');
    const [expectedDueDate, setExpectedDueDate] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>('');
    const [goals, setGoals] = useState<Goals>({
        id: '',
        waterIntakeGoal: 70,
        proteinIntakeGoal: 70,
        exerciseGoal: 30,
        kegelsGoal: 100,
        garlandPoseGoal: 10
    })
    const [providerId, setProviderId] = useState<string | null>('');
    const [refreshToken, setRefreshToken] = useState<string | null>('');
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
    const { data } = useUser(userId, email);

    onAuthStateChanged(auth, async (user) => {
        // conditional to check data from useUser to match user from firebase ?
        if (user) {
            try {
                const bearerToken = await user.getIdToken();
                localStorage.setItem('token', bearerToken);
            } catch (e) {
                console.log('getIdToken failure', e);
                const newToken = await getAuth().currentUser?.getIdToken();
                localStorage.setItem('token', newToken ?? '');
            }
            setProviderId(providerId);
            setRefreshToken(refreshToken);
            setUserId(user.uid);
            setEmail(user.email);
            setIsLoggedIn(true);
            setPhotoURL(user.photoURL);
        } else {
            localStorage.setItem('token', '');
            setUserId(undefined);
            setEmail('');
            setIsLoggedIn(false);
            setIsLoadingUser(true);
            setDisplayName('');
            setPhotoURL('');
            setExpectedDueDate(null);
            signOut(auth);
        }
    })

    React.useEffect(() => {
        if (data && data.id === userId) {
            setDisplayName(data.displayName);
            setExpectedDueDate(data.expectedDueDate);
            setGoals(data.goals);
            setIsLoadingUser(false);
        } 
    }, [data, userId]);

    return (
        <AuthContext.Provider 
            value={{
            isLoggedIn: isLoggedIn,
            isLoadingUser: isLoadingUser,
            id: userId,
            displayName: displayName,
            photoURL: photoURL,
            expectedDueDate: expectedDueDate,
            email: email,
            goals: goals,
            setUserId: setUserId,
            setExpectedDueDate: setExpectedDueDate,
            setDisplayName: setDisplayName,
            setGoals: setGoals,
            setIsLoadingUser: setIsLoadingUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;