import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from '../blocks/Registration/Registration';
import Login from '../blocks/Login/Login';
import Home from '../blocks/Home/Home';

const Stack = createNativeStackNavigator();

class StackNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default StackNavigation;
