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

interface AuthProviderProps {}

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence);
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [displayName, setDisplayName] = useState<string | null>('');
    const [photoURL, setPhotoURL] = useState<string | null>('');
    const [expectedDueDate, setExpectedDueDate] = useState<string | null>(null);
    const { data } = useUser(userId, displayName);

    const updateExpectedDueDate = (newDueDate: string) => {
        setExpectedDueDate(newDueDate)
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserId(user.uid);
            setIsLoggedIn(true);
            setDisplayName(user.displayName);
            setPhotoURL(user.photoURL);
        } else {
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
            setExpectedDueDate: updateExpectedDueDate
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;