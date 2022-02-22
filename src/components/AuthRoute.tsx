import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface IAuthRouteProps {};

const AuthRoute: React.FC<IAuthRouteProps> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
        setLoading(false)
    } else {
        console.log('unauthorized')
        navigate('/login');
    }
  })

  useEffect(() => {
    AuthCheck();

  }, [auth, AuthCheck]);

  if (loading) return <p>loading ...</p>;

  return (
    <>{children}</>
  )
}

export default AuthRoute