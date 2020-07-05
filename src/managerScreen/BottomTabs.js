import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  Notifications  from '../Notification';
import {useTheme} from 'react-native-paper';
import ChoPhien from '../screen/ChoPhien';
import KhachHang from '../screen/KhachHang';
import MainCaNhan from '../screen/MainCaNhan';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const theme = useTheme();
  return (
    <Tab.Navigator 
      initialRouteName="Chợ"        
      shifting={true}
      sceneAnimationEnabled={false}>
      <Tab.Screen
        name="Chợ"
        component={ChoPhien}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}        
      />
      <Tab.Screen
        name="Khách hàng"
        component={KhachHang}
        options={{
          tabBarLabel: "Khách hàng",
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
        }}        
      />
      <Tab.Screen
        name="Cá nhân"
        component={MainCaNhan}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}        
      />
    </Tab.Navigator>
  );
};