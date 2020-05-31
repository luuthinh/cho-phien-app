import React from 'react';
import { View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, useTheme } from 'react-native-paper';


import ChoPhien from './ChoPhien';
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
      {previous ?(
        <View style={{flex:1}}>
          <Appbar.BackAction
          onPress={navigation.goBack}
          />
          <Appbar.Action 
            style={{position: 'absolute', right: 0}}
            icon="archive"
            onPress={() => console.log('Pressed archive')} />           
          </View>
        )
       : 
        <Appbar.Content
        title={title}
        style={{alignItems:'center'}}
      />
      }    
    </Appbar.Header>
  );
};

export default function StackNavigator()  {
  return (
    <Stack.Navigator
      initialRouteName="Sản phẩm"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="Sản phẩm"
        component={ChoPhien}
        options={{ headerTitle: 'Chợ' }}
      />
      <Stack.Screen
        name="Đặt hàng"
        component={DatHang}
        options={{ headerTitle: 'Đặt hàng' }}
      />
    </Stack.Navigator>
  );
};