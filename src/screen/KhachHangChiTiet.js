import React from 'react';
import { Text, View,StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Card, Paragraph, TextInput} from 'react-native-paper';

// Lấy kích thước màn hình thiết bị
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

class KhachHangChiTiet extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  componentDidMount(){
  }
  render() {
    return (
        <View>
            <Text>Thông tin khách hàng</Text>
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

export default connect(mapStateToProps)(KhachHangChiTiet);

const styles = StyleSheet.create({
});