import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Info from '../scenes/Info';
import Color from '../scenes/Color';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Color" component={Color} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
