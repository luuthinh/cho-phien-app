import React from 'react';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import DangNhap from '../screen/DangNhap';
import BottomTabs from './BottomTabs';
import DatHang from  '../screen/DatHang';
import KhachHangChiTiet from '../screen/KhachHangChiTiet';
import SoDiaChi from '../screen/SoDiaChi';

const Stack = createStackNavigator();

export default function StackDangNhap()  {
  return (
    <Stack.Navigator
      initialRouteName="Đăng ký/ Đăng nhập"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
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
      <Stack.Screen
        name="Đặt hàng"
        component={DatHang}
      />   
      <Stack.Screen
        name="Thông tin khách hàng"
        component={KhachHangChiTiet}
      />  
      <Stack.Screen
        name="Sổ địa chỉ"
        component={SoDiaChi}
      />                         
    </Stack.Navigator>
  );
};