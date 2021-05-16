import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Info from '../scenes/Info';
import Color from '../scenes/Color';
import T from '../scenes/T3-01';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="T" component={T} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Color" component={Color} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
