import React from 'react';
import color from 'color';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import  Notifications  from '../Notification';
import {useTheme} from 'react-native-paper';
import ChoPhien from '../screen/ChoPhien';
import KhachHang from '../screen/KhachHang';
import MainCaNhan from '../screen/MainCaNhan';
import DonHang from '../screen/DonHang';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTab() {
  const theme = useTheme();
  return (
    <Tab.Navigator 
      initialRouteName="Chợ"        
      shifting={true}
      activeColor={theme.colors.primary}
      inactiveColor={color(theme.colors.text)
        .alpha(0.6)
        .rgb()
        .string()}      
      sceneAnimationEnabled={false}>
      <Tab.Screen
        name="Chợ"
        component={ChoPhien}
        options={{
          tabBarIcon: 'home-account',
          tabBarColor:'white'
        }}        
      />
      <Tab.Screen
        name="Khách hàng"
        component={KhachHang}
        options={{
          tabBarColor:'white',
          tabBarIcon:"account-group",
        }}
      />
      <Tab.Screen
        name="Đơn hàng"
        component={DonHang}
        options={{
          tabBarColor:'white',
          tabBarIcon:"clipboard-text-outline",
        }}
      />      
      {/* <Tab.Screen
        name="Thông báo"
        component={Notifications}
        options={{
          tabBarIcon: 'bell',
          tabBarColor:'white'
        }}         */}
      {/* /> */}
      <Tab.Screen
        name="Cá nhân"
        component={MainCaNhan}
        options={{
          tabBarIcon: 'account',
          tabBarColor:'white'
        }}        
      />
    </Tab.Navigator>
  );
};