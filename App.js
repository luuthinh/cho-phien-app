import React from 'react';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import StackDangNhap from './src/managerScreen/StackDangNhap';
import { Provider} from 'react-redux';
import store from './src/redux/store';

const theme = {...DefaultTheme, 
              roundness:2, 
              colors: {
                ...DefaultTheme.colors,
                primary: '#3498db',
                accent: '#f1c40f',
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