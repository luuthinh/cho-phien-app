import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DangNhap from '../screen/DangNhap';
import BottomTabs from './BottomTabs';


const Stack = createStackNavigator();

export default function StackDangNhap()  {
  return (
    <Stack.Navigator
      initialRouteName="Đăng ký/ Đăng nhập"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Đăng ký/ Đăng nhập"
        component={DangNhap}
      />
      <Stack.Screen
        name="Chợ"
        component={BottomTabs}
      />      
    </Stack.Navigator>
  );
};