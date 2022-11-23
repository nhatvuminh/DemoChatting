import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useAppSelector} from './src/redux/hooks';
import {RootState} from './src/redux/store';
import ChatsScreen from './src/screens/Chats';
import LoginScreen from './src/screens/Login';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const RootStack = createStackNavigator();

const App = () => {
  const {isLogged} = useAppSelector(
    (state: RootState) => state.userInfoReducer,
  );
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          {!isLogged ? (
            <RootStack.Screen name="Login" component={LoginScreen} />
          ) : (
            <RootStack.Screen name="Chats" component={ChatsScreen} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
