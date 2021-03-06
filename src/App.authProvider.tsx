import React, { useState } from 'react';
import { AuthContext } from './shared/auth-context';
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
    const [displayName, setDisplayName] = useState<string | null>('');
    const [photoURL, setPhotoURL] = useState<string | null>('');
    const [expectedDueDate, setExpectedDueDate] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>('');
    const [providerId, setProviderId] = useState<string | null>('');
    const [refreshToken, setRefreshToken] = useState<string | null>('');
    const { data } = useUser(userId, email);

    const updateExpectedDueDate = (newDueDate: string) => {
        setExpectedDueDate(newDueDate)
    }
    
    const updateDisplayName = (displayName: string | null) => {
        setDisplayName(displayName)
    }

    onAuthStateChanged(auth, async (user) => {
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
            setIsLoggedIn(false);
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
        } 
    }, [data, userId]);

    return (
        <AuthContext.Provider 
            value={{
            isLoggedIn: isLoggedIn,
            id: userId,
            displayName: displayName,
            photoURL: photoURL,
            expectedDueDate: expectedDueDate,
            email: email,
            setExpectedDueDate: updateExpectedDueDate,
            setDisplayName: updateDisplayName
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;