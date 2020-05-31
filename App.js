import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/BottomTabs';
import {View, Text} from 'react-native';

export default function App() {
  return (
    // <View>
    //   <Text>Thinh</Text>
    // </View>
    <PaperProvider>
      <NavigationContainer>
        <BottomTabs/>
      </NavigationContainer>
    </PaperProvider>
  );
}