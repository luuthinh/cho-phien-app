import React from 'react';
import { Text, View } from 'react-native';
import { Card, Avatar, IconButton} from 'react-native-paper';

class MainCaNhan extends React.Component {
    render() {
        return (
            <View style={{ flex: 1}}>
                <Card>
                    <Card.Title 
                    title="Đăng Nhập/ Đăng Ký" 
                    subtitle="Chưa đăng nhâp"
                    left = {() => <Avatar.Image size={36} source={require('./image/download.jpeg')}/>}
                    right={() => <IconButton
                                            icon="archive" 
                                            onPress={() => {return this.props.navigation.navigate('Đăng ký/ Đăng nhập')}}/>}
                    />
                </Card>
            </View>
          );
    }

}

export default MainCaNhan;
