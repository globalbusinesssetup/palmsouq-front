import { AuthContext } from '@/context/AuthContext';
import * as React from 'react';

const useAuth = () => React.useContext(AuthContext);

export default useAuth;
