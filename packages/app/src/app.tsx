import 'react-native-gesture-handler';
import 'expo-dev-client';
import React from 'react';
import { RuntimeProvider } from './features/runtime';
import { WorkletsProvider } from './features/worklets';
import { Router } from './router';
import { Colors, ThemeManager, Typography } from 'react-native-ui-lib';

Colors.loadColors({
  error: '#ff2442',
  success: '#00CD8B',
  text: '#20303C',
  primary: '#6ab04c',
  secondary: '#686de0',
  background: '#ccc',
  shade: '#eee',
});

Typography.loadTypographies({
  body2: { fontWeight: '600', textTransform: 'capitalize' },
});

ThemeManager.setComponentTheme('Button', (props: any) => ({
  backgroundColor: Colors[props.bg],
  borderRadius: 3,
}));

const App = () => (
  <WorkletsProvider>
    <RuntimeProvider>
      <Router />
    </RuntimeProvider>
  </WorkletsProvider>
);

export { App };
