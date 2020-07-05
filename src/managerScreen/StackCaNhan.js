import React from 'react';
import { View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar} from 'react-native-paper';

import MainCaNhan from '../screen/MainCaNhan';


const Stack = createStackNavigator();

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
            icon="archive"
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

export default function StackCaNhan()  {
  return (
    <Stack.Navigator
      initialRouteName="Cá nhân"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="Cá nhân"
        component={MainCaNhan}
        options={{ headerTitle: 'Cá nhân' }}
      />
    </Stack.Navigator>
  );
};