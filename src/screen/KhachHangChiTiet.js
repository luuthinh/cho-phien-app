import React from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, FlatList, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Appbar, TextInput, withTheme, Button, List, Text, IconButton, Colors} from 'react-native-paper';
import {URL_RPC,DB} from '../constants/API';
// Lấy kích thước màn hình thiết bị
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width

class KhachHangChiTiet extends React.Component {
  constructor(props){
    super(props)
    console.log(props.route)
    let {params} = props.route;
    this.state = {
      id: params.id,
      name: params.name,
      email: params.email,
      mobile: params.mobile,
      addressData:[
      ]
    }
  }
  componentDidMount(){
  }

  _renderItem = ({ item }) => (
    <List.Item
    title={item.title}
    style={{backgroundColor:'white'}}
    description="Item description"
    left={props => <List.Icon {...props} icon="account"/>}
    right={props => <IconButton
      icon="trash-can-outline"
      color={Colors.red500}
      size={20}
      onPress={() => console.log('Pressed')}
  />}
  />
  )
  _footer= () => {
    return(
      <List.Item
      style={{backgroundColor:'white'}}
      title="Thêm địa chỉ giao hàng"
      onPress={()=> console.log("Nhan")}
      left={props => <List.Icon {...props} icon="plus" />}
      />
    )
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
    console.log("lưu khách hàng")
  }  
  render() {
    const theme = this.props.theme
    return (
      <SafeAreaView>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.props.navigation.goBack} color={theme.colors.title} size={30}/>
          <Appbar.Content title="Thông tin khách hàng" color={theme.colors.title} titleStyle={{fontSize:20}}/>
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
            label="Họ tên"/>
          <TextInput
            autoCapitalize="none" 
            onChangeText={(email) => this.setState({email})}
            style={styles.customerForm}
            label="Email"/>
          <TextInput 
            onChangeText={(mobile) => this.setState({mobile})}
            style={styles.customerForm}
            label="Số điện thoại"/>
          <Text style={styles.titleAddress} >Sổ địa chỉ</Text>
          <FlatList
            data={this.state.addressData}
            renderItem={this._renderItem}
            ListFooterComponent={this._footer}
            keyExtractor={item => item.id}
          />
          {
            this.state.id == null ?           
              <Button
              style={styles.saveButton}
              mode = 'contained'
              onPress = {this._createCustomer}
              labelStyle={{color:'white'}}
              >Tạo mới khách hàng</Button>
            :
              <Button
              style={styles.saveButton}
              mode = 'contained'
              onPress={this._saveCustomer}
              labelStyle={{color:'white'}}
              >Lưu thông tin</Button>
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

export default connect(mapStateToProps)(withTheme(KhachHangChiTiet));

const styles = StyleSheet.create({
  container: {
  },
  customerForm: {
    height: 60,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
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