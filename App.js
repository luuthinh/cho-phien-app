import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/managerScreen/BottomTabs';


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