import * as React from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = React.useState(null);
  const [hasAuthToken, setHasAuthToken] = React.useState(false);

  React.useEffect(() => {
    // Load the authentication token from AsyncStorage when the component mounts
    async function fetchToken() {
      console.log('loading authToken')
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('token found');
          setAuthToken(token);
          setHasAuthToken(true);
        }
      } catch (e) {
        console.log('no token found')
        // ignore -> means no token has been found
      }
    }

    fetchToken();
  }, []);

  React.useEffect(() => {
    async function setToken() {
      console.log('seeing if token exists')
      try {
        if (authToken === null) {
          console.log('trying to remove token');
          await AsyncStorage.removeItem('token');
          setHasAuthToken(false);
        } else {
          console.log('setting token to:', authToken);
          await AsyncStorage.setItem('token', authToken);
          setHasAuthToken(true);
        }
      } catch (e) {
        // ignore 
      }
    }

    setToken();
  }, [authToken])

  const removeToken = () => {
    setAuthToken(null);
  };

  return (
    <>
      <AuthContext.Provider value={{ authToken, setAuthToken, hasAuthToken, removeToken }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContext, AuthProvider };
