import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  Messages  from './Message';
import  Notifications  from './Notification';
import StackCho from './StackCho';

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
        component={Messages}
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