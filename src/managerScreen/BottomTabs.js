import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  Notifications  from '../Notification';
import StackCho from './StackCho';
import StackCaNhan from './StackCaNhan';
import StackKhachHang from './StackKhachHang';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Chợ">
      <Tab.Screen
        name="Chợ"
        component={StackCho}
        options={{
          tabBarLabel: 'Chợ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}        
      />
      <Tab.Screen
        name="Khách hàng"
        component={StackKhachHang}
        options={{
          tabBarLabel: "Khách hàng",
          tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="account-group" color={color} size={size}/>)
        }}
      />
      <Tab.Screen
        name="Thông báo"
        component={Notifications}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}        
      />
      <Tab.Screen
        name="Cá nhân"
        component={StackCaNhan}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}        
      />
    </Tab.Navigator>
  );
};