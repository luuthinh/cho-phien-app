import React from 'react';
import { Text, View } from 'react-native';
import { Card, Avatar, Button, Appbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {logout} from '../redux/actions';
import {URL_IMAGE} from '../constants/API';

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
                <Appbar.Header>
                    <Appbar.Content
                        title="Cá Nhân"
                        style={{alignItems:'center'}}
                        titleStyle={{color: 'white', fontSize:25}}
                /> 
          </Appbar.Header>  
                <Card>
                    <Card.Title 
                    title={this.props.name}
                    subtitle={this.props.userName}
                    left = {() => <Avatar.Image size={48}                         
                                                source={{uri: `${URL_IMAGE}/res.partner/${this.props.partnerID}/image_128/48x48`,
                                                        method: "GET",
                                                        headers: {
                                                        "Content-Type": "application/x-www-form-urlencoded",
                                                        "X_Openerp": this.props.sessionID,
                                                        }
                                                }}
                                    />
                            }
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
      partnerID: state.auth.partnerID
    };
  }
export default connect(mapStateToProps,{logout})(MainCaNhan);  


