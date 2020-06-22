import React from 'react';
import { Text, View } from 'react-native';
import { Card, Avatar, IconButton} from 'react-native-paper';
import {connect} from 'react-redux';

class MainCaNhan extends React.Component {
    constructor(props) {
        super(props);    
    }
    componentDidUpdate(prevtProps) {
        const { userName } = this.props;
        console.log("next props")
        console.log(this.props)
    }    
    render() {
        console.log("Màn hình cá nhân")
        console.log(this.props)
        return (
            <View style={{ flex: 1}}>
                <Card>
                    <Card.Title 
                    title={this.props.name}
                    subtitle={this.props.userName}
                    left = {() => <Avatar.Image size={36} source={require('./image/download.jpeg')}/>}
                    right={() => <IconButton
                                            icon="archive" 
                                            onPress={() => {return this.props.navigation.navigate('Đăng ký/ Đăng nhập')}}/>}
                    />
                </Card>
                <Card>
                    <Text>{this.props.uid}</Text>
                    <Text>{this.props.sessionID}</Text>
                    <Text>{this.props.expiresDate}</Text>
                    <Text>{this.props.password}</Text>
                </Card>
            </View>
          );
    }

}

function mapStateToProps(state) {
    return {
      userName: state.auth.userName,
      name: state.auth.name,
      uid : state.auth.uid,
      password: state.auth.password,
      sessionID: state.auth.sessionID,
      expiresDate: state.auth.expiresDate,
    };
  }

export default connect(mapStateToProps)(MainCaNhan);  


