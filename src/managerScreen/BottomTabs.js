import React from 'react';
import color from 'color';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  Notifications  from '../Notification';
import {useTheme} from 'react-native-paper';
import ChoPhien from '../screen/ChoPhien';
import KhachHang from '../screen/KhachHang';
import MainCaNhan from '../screen/MainCaNhan';

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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarColor:'white'
        }}        
      />
      <Tab.Screen
        name="Khách hàng"
        component={KhachHang}
        options={{
          tabBarColor:'white',
          tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="account-group" color={color} size={size}/>)
        }}
      />
      <Tab.Screen
        name="Thông báo"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarColor:'white'
        }}        
      />
      <Tab.Screen
        name="Cá nhân"
        component={MainCaNhan}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarColor:'white'
        }}        
      />
    </Tab.Navigator>
  );
};