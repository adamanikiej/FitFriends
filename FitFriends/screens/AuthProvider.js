import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Authenticated } from './Authenticated';

const AuthContext = React.createContext({});
const Stack = createNativeStackNavigator();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = React.useState(undefined);

  React.useEffect(() => {
    // Load the authentication token from AsyncStorage when the component mounts
    async function fetchToken() {
      try {

        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          setAuthToken(token);
        }
      } catch (e) {
        // ignore 
      }
    }

    fetchToken();
  }, []);

  React.useEffect(() => {
    async function setToken() {
      try {
        if (authToken === null) {
          await AsyncStorage.removeItem('token');
        } else {
          await AsyncStorage.setItem('token', authToken);
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
    <AuthContext.Provider value={{ authToken, setAuthToken, removeToken }}>
    {authToken === undefined ? (
      <Stack.Navigator 
      initialRouteName="Welcome" 
      screenOptions= {{
        headerStyle: { 
          backgroundColor: '#EEEEEE'
        }, 
        headerTitleStyle: {
          fontFamily: 'PTSerif_700Bold',
          fontSize: 20
        },
        headerTintColor: 'black',
        headerShadowVisible: false
      }}
      >
        {children}
      </Stack.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen name="Authenticated" component={Authenticated} options={{ headerShown: false }} />
      </Stack.Navigator>
    )}
  </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
