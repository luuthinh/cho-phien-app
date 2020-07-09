import React from 'react';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { AppearanceProvider} from 'react-native-appearance';
import StackDangNhap from './src/managerScreen/StackDangNhap';
import { Provider} from 'react-redux';
import store from './src/redux/store';

const theme = {...DefaultTheme, 
              colors: {
                ...DefaultTheme.colors,
                primary: '#5CAA0E',
                accent: '#ffd700',
                background: '#f9f9f9',
                text: '#545454',
                textbold: '#67696c',
                title: '#ffffff',
                card: '#ffffff'
          }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <PaperProvider theme={theme}>
            <Provider store={store}>
              <NavigationContainer>
                <StackDangNhap/>
              </NavigationContainer>
            </Provider>
        </PaperProvider>
      </AppearanceProvider>
    </SafeAreaProvider>

  );
}