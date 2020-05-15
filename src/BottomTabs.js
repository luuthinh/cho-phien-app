import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import  ChoPhien  from './ChoPhien';
import  Messages  from './Message';
import  Notifications  from './Notification';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Chợ"
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Chợ"
        component={ChoPhien}
        options={{
          tabBarIcon: 'home-account',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: 'bell-outline',
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: 'message-text-outline',
        }}
      />
    </Tab.Navigator>
  );
};