import React from 'react';
import { Text, View } from 'react-native';
import { Card, Avatar, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {logout} from '../redux/actions'

class MainCaNhan extends React.Component {
    constructor(props) {
        super(props);    
    };
    signOutAsync = async() => {
        await this.props.logout();
        this.props.navigation.navigate(
            "Đăng ký/ Đăng nhập"
        );
    };        
    render() {
        console.log(this.props)
        return (
            <View style={{ flex: 1}}>
                <Card>
                    <Card.Title 
                    title={this.props.name}
                    subtitle={this.props.userName}
                    left = {() => <Avatar.Image size={36} source={require('./image/download.jpeg')}/>}
                    />
                </Card>
                <Button
                    mode="contained"
                    onPress={this.signOutAsync}
                >
                <Text style={{alignItems:'center'}}>Đăng xuất</Text>    
                </Button>     
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
export default connect(mapStateToProps,{logout})(MainCaNhan);  


