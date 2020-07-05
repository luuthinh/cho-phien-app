import React from 'react';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import {Appbar} from 'react-native-paper';
import DangNhap from '../screen/DangNhap';
import BottomTabs from './BottomTabs';
import DatHang from  '../screen/DatHang';
import KhachHangChiTiet from '../screen/KhachHangChiTiet';

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    stiffness:1000,
    damping:500,
    mas: 3,
    overshootClaming:true,
    restDisplacementThreshold: 0.01,
    resSpeedThreshold: 0.01,
  }
}

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header>
        <Appbar.Content
        title={title}
        style={{alignItems:'center'}}
        titleStyle={{color: 'white', fontSize:25}}
      /> 
    </Appbar.Header>
  );
};
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
    </Stack.Navigator>
  );
};