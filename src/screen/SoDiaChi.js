import React from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Appbar, TextInput, withTheme, Button, List, Text, IconButton, Colors, Paragraph} from 'react-native-paper';
import {URL_RPC,DB} from '../constants/API';
import Many2one from '../component/Many2one';
import { object } from 'prop-types';
// Lấy kích thước màn hình thiết bị
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width

class SoDiaChi extends React.Component {  
  constructor(props){
    super(props)
    if (props.route.params.id !== undefined){
      let {params} = props.route;
      this.state = {
        id: params.id,
        name: params.name,
        mobile: params.mobile,
        stateID: params.stateID,
        districtID: params.districtID,
        wardID: params.wardID,
        street : params.street,
        parentID: params.parentID,
    }    
    }
    else {    
      this.state = {
          id: null,
          name: '',
          mobile: '',
          stateID: {},
          districtID: {},
          wardID: {},
          street : '',
          parentID: null,
      }
    }
  }
  _createAddress = () => {
    if (this.state.name == ''){
      Alert.alert("Chưa nhập tên người nhận")
    }
    else if (this.state.mobile == ''){
      Alert.alert("Chưa nhập số điện thoại")
    }
    else if (this.state.street == ''){
      Alert.alert("Chưa nhập số nhà")
    }
    else if (this.state.wardID == ''){
      Alert.alert("Chưa nhập tên phường/xã")
    }
    else if (this.state.districtID == ''){
      Alert.alert("Chưa nhập quận/huyện")
    } 
    else if (this.state.stateID == ''){
      Alert.alert("Chưa nhập tỉnh/thành")
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
                    "mobile": this.state.mobile,
                    "parent_id": this.props.route.params.parentID,
                    "type": "delivery",
                    "street": this.state.street,
                    "state_id": this.state.stateID.id,
                    "x_qh_id": this.state.districtID.id,
                    "x_px_id": this.state.wardID.id,

                  }]]
        }
      })
    })
    .then((response) => response.json())
    .then((results) => {
      console.log(results)
      if ('result' in results){
        this.setState({id:results.result})
        Alert.alert("Tạo địa chỉ thành công")
      }
      else if ('error' in results){
        Alert.alert("Tạo địa chỉ thất bại")
      }
    })
    .catch((error) => Alert.alert("Tạo địa chỉ thất bại"))
    }
  }
  _saveCustomer = () => {
    if (this.state.name == ''){
      Alert.alert("Chưa nhập tên người nhận")
    }
    else if (this.state.mobile == ''){
      Alert.alert("Chưa nhập số điện thoại")
    }
    else if (this.state.street == ''){
      Alert.alert("Chưa nhập số nhà")
    }
    else if (this.state.wardID == ''){
      Alert.alert("Chưa nhập tên phường/xã")
    }
    else if (this.state.districtID == ''){
      Alert.alert("Chưa nhập quận/huyện")
    } 
    else if (this.state.stateID == ''){
      Alert.alert("Chưa nhập tỉnh/thành")
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
                  "res.partner","write",[[this.state.id],{
                    "name":this.state.name,
                    "mobile": this.state.mobile,
                    "parent_id": this.props.route.params.parentID,
                    "street": this.state.street,
                    "state_id": this.state.stateID.id,
                    "x_qh_id": this.state.districtID.id,
                    "x_px_id": this.state.wardID.id,

                  }]]
        }
      })
    })
    .then((response) => response.json())
    .then((results) => {
      console.log(results)
      if ('result' in results){
        this.setState({id:results.result})
        Alert.alert("Lưu thay đổi thành công")
      }
      else if ('error' in results){
        Alert.alert("Lưu thay đổi thất bại")
      }
    })
    .catch((error) => Alert.alert("Lưu thay đổi thất bại"))
    }
  } 
  render() {
    const theme = this.props.theme
    console.log("state")
    console.log(this.state)
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
                    onChangeText={(name) => this.setState({name})} 
                    style={styles.customerForm}
                    defaultValue={this.state.name}
                    label="Người nhận"/>          
            <TextInput
                    onChangeText={(mobile) => this.setState({mobile})} 
                    style={styles.customerForm}
                    defaultValue={this.state.mobile}
                    label="Số điện thoại"/>                    
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
                defaultItem = {this.state.stateID} 
                placeholder='Chọn tỉnh thành'
                label='Tỉnh thành'
                onSelect={(item) =>{
                  this.setState({stateID:item})
                }}
            /> 
            <Many2one 
                model="x_quan_huyen"
                uid={this.props.uid}
                password={this.props.password}
                db={DB}
                url={URL_RPC}
                defaultItem = {this.state.districtID}
                disabled = {Object.keys(this.state.stateID).length ? false : true}
                domain = {[['x_state_id', '=', this.state.stateID.id]]}
                placeholder='Chọn quận huyện'
                label='Quận huyện'
                onSelect={(item) =>{
                  this.setState({districtID:item})
                }}
            />
            <Many2one 
                model="x_phuong_xa"
                uid={this.props.uid}
                password={this.props.password}
                db={DB}
                url={URL_RPC} 
                defaultItem = {this.state.wardID}
                disabled = {Object.keys(this.state.districtID).length ? false : true}
                domain = {[['x_qh_id', '=', this.state.districtID.id]]}
                placeholder='Chọn phường xã'
                label='Phường xã'
                onSelect={(item) =>{
                  this.setState({wardID:item})
                }}
            />                          

          {
            this.state.id == null ?           
              <Button
              style={styles.saveButton}
              mode = 'contained'
              onPress = {this._createAddress}
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