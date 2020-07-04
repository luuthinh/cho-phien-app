import React from 'react';
import { View} from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';

import KhachHang from '../screen/KhachHang';
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
      {previous ?(
        <View style={{flex:1}}>
          <Appbar.BackAction
          onPress={navigation.goBack}
          />
          <Appbar.Action 
            style={{position: 'absolute', right: 0}}
            icon="cart"
            onPress={() => console.log('Pressed archive')} />           
          </View>
        )
       : 
        <Appbar.Content
        title={title}
        style={{alignItems:'center'}}
        titleStyle={{color: 'white', fontSize:25}}
      />
      }    
    </Appbar.Header>
  );
};

export default function StackKhachHang()  {
  return (
    <Stack.Navigator
      initialRouteName="Danh sách khách hàng"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Stack.Screen
        name="Danh sách khách hàng"
        component={KhachHang}
        options={{ 
          headerTitle: 'Khách hàng', 
          transitionSpec:{
            open: config,
            close: config,
          }
        }}
      />
      <Stack.Screen
        name="Thông tin khách hàng"
        component={KhachHangChiTiet}
        options={{ 
          headerTitle: 'Thông tin khách hàng', 
          transitionSpec:{
            open: config,
            close: config,
          }
        }}
      />      
    </Stack.Navigator>
  );
};