import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

class DangNhap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password: '',
        }
    }
    
    render() {
        return (
            <View>
                <TextInput
                    label='Email'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    label='Password'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                /> 
                <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                    Đăng nhập
                </Button>  
            </View>
          );
    }

}

export default DangNhap;