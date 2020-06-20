import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import StackDangNhap from './src/managerScreen/StackDangNhap';
import { Provider} from 'react-redux';
import store from './src/redux/store';


export default function App() {
  return (
      <PaperProvider>
          <Provider store={store}>
            <NavigationContainer>
              <StackDangNhap/>
            </NavigationContainer>
          </Provider>
      </PaperProvider>
  );
}