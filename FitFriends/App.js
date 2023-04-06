import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { PTSerif_400Regular_Italic, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';

import { WelcomeScreen } from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [appLoaded, setAppLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          AbrilFatface_400Regular,
          PTSerif_400Regular_Italic,
          PTSerif_400Regular,
          PTSerif_700Bold
        })
      } catch {
        // handle font loading error
      } finally {
        setAppLoaded(true);
      }
    })();
  }, []);

  const onLayout = React.useCallback(() => {
    if (appLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appLoaded]);

  if (!appLoaded) {
    return null;;
  }

  return (
    <NavigationContainer style={{ width: '100%', hieght: '100%' }} onReady={onLayout}>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;