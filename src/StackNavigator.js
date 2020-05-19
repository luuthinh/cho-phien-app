import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import BottomTabs from './BottomTabs';
import DatHang from './DatHang';

const Stack = createStackNavigator();

const Header = ({ scene, previous, navigation }) => {
  const theme = useTheme();
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={{colors:{primary: theme.colors.surface}}}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Avatar.Image
            size={40}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          previous ? title : <MaterialCommunityIcons name="home" size={40} />
        }
      />
    </Appbar.Header>
  );
};

export default StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Chợ"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="Chợ"
        component={BottomTabs}
        options={{ title: 'Chợ' }}
      />
      <Stack.Screen
        name="Đặt hàng"
        component={DatHang}
        options={{ headerTitle: 'Đặt hàng' }}
      />
    </Stack.Navigator>
  );
};