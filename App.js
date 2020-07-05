import React from 'react';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import StackDangNhap from './src/managerScreen/StackDangNhap';
import { Provider} from 'react-redux';
import store from './src/redux/store';

const theme = {...DefaultTheme, 
              colors: {
                ...DefaultTheme.colors,
                primary: '#5CAA0E',
                accent: '#f1c40f',
                background: '#ffffff',
                text: '#404040',
                surface: '#ffffff',
                title: '#ffffff'
          }
}

export default function App() {
  return (
      <PaperProvider theme={theme}>
          <Provider store={store}>
            <NavigationContainer>
              <StackDangNhap/>
            </NavigationContainer>
          </Provider>
      </PaperProvider>
  );
}