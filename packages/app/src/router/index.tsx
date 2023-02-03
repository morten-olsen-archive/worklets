import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeTasksScreen } from '../screens/home/tasks';
import { UtilsScannerScreen } from '../screens/utils/scanner';
import { RootStackParamList } from './types';
import { WorkletDetailsScreen } from '../screens/worklet/details';
import { WorkletCodeScreen } from '../screens/worklet/code';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeTasksScreen} />
      <Stack.Screen name="Scan" component={UtilsScannerScreen} />
      <Stack.Screen
        options={{ title: 'Worklet' }}
        name="WorkletDetails"
        component={WorkletDetailsScreen}
      />
      <Stack.Screen name="WorkletCode" component={WorkletCodeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export { Router };
