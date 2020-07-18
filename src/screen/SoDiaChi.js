import React from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Appbar, TextInput, withTheme, Button, List, Text, IconButton, Colors, Paragraph} from 'react-native-paper';
import {URL_RPC,DB} from '../constants/API';
import Many2one from '../component/Many2one';
// Lấy kích thước màn hình thiết bị
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width

class SoDiaChi extends React.Component {  
  constructor(props){
    super(props)
    this.state = {
        id: null,
        street : ''
    }
  }
  _createCustomer = () => {
    if (this.state.name == ''){
      Alert.alert("Chưa có tên khách hàng")
    }
    else {
    fetch(URL_RPC, {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        params:{
          "service":"object",
          "method":"execute_kw",
          "args":[DB,
                  this.props.uid,this.props.password,
                  "res.partner","create",[{
                    "name":this.state.name,
                    "email":this.state.email,
                    "mobile": this.state.mobile,
                    "parent_id": this.props.partnerID,
                  }]]
        }
      })
    })
    .then((response) => response.json())
    .then((results) => {
      console.log(results)
      if ('result' in results){
        this.setState({id:results.result})
        Alert.alert("Tạo khách hàng thành công")
      }
      else if ('error' in results){
        Alert.alert("Tạo khách hàng thất bại")
      }
    })
    .catch((error) => Alert.alert("Tạo khách hàng thất bại"))
    }
  }
  _saveCustomer = () => {
    if (this.state.name == ''){
      Alert.alert("Chưa có tên khách hàng")
    }
    else {
    fetch(URL_RPC, {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        params:{
          "service":"object",
          "method":"execute_kw",
          "args":[DB,
                  this.props.uid,this.props.password,
                  "res.partner","write",[[this.state.id],
                  {"name":this.state.name,"email":this.state.email,"mobile":this.state.mobile}]]
        }
      })
    })
    .then((response) => response.json())
    .then((results) => {
      console.log(results)
      if ('result' in results){
        Alert.alert("Thay đổi thành công")
      }
      else if ('error' in results){
        Alert.alert("Thay đổi thất bại")
      }
    })
    .catch((error) => Alert.alert("Thay đổi thất bại"))
    }
  } 
  render() {
    const theme = this.props.theme
    return (
      <SafeAreaView>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.props.navigation.goBack} color={theme.colors.title} size={30}/>
          <Appbar.Content title="Địa chỉ" color={theme.colors.title} titleStyle={{fontSize:20}}/>
          <Appbar.Action 
            style={{position: 'absolute', right: 0}}
            icon="cart-outline"
            color={theme.colors.title}
            size={30}
            onPress={() => console.log('Pressed archive')} />
        </Appbar.Header>
        <View style={styles.container}>          
            <TextInput
                onChangeText={(street) => this.setState({street})} 
                style={styles.customerForm}
                defaultValue={this.state.street}
                label="Số nhà"/>
            <Many2one 
                model="res.country.state"
                uid={this.props.uid}
                password={this.props.password}
                db={DB}
                url={URL_RPC} 
                placeholder='Chọn tỉnh thành'
                label='Tỉnh thành'
                onSelect={this._onselect}
            /> 
            <Many2one 
                model="x_quan_huyen"
                uid={this.props.uid}
                password={this.props.password}
                db={DB}
                url={URL_RPC} 
                placeholder='Chọn quận huyện'
                label='Quận huyện'
                onSelect={this._onselect}
            />
            <Many2one 
                model="x_phuong_xa"
                uid={this.props.uid}
                password={this.props.password}
                db={DB}
                url={URL_RPC} 
                placeholder='Chọn phường xã'
                label='Phường xã'
                onSelect={this._onselect}
            />                          

          {
            this.state.id == null ?           
              <Button
              style={styles.saveButton}
              mode = 'contained'
              onPress = {this._createCustomer}
              labelStyle={{color:'white'}}
              >Tạo địa chỉ </Button>
            :
              <Button
              style={styles.saveButton}
              mode = 'contained'
              onPress={this._saveCustomer}
              labelStyle={{color:'white'}}
              >Lưu địa chỉ</Button>
          }              
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    userName: state.auth.userName,
    name: state.auth.name,
    uid : state.auth.uid,
    partnerID: state.auth.partnerID,
    password: state.auth.password,
    sessionID: state.auth.sessionID,
    expiresDate: state.auth.expiresDate,
  };
}

export default connect(mapStateToProps)(withTheme(SoDiaChi));

const styles = StyleSheet.create({
  container: {
  },
  customerForm: {
    height: 60,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    marginTop: 5,
  },
  titleAddress:{
    fontSize: 18,
    fontWeight: '700',
  },
  saveButton: {
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
});