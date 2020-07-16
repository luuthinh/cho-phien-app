import React from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, FlatList, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Appbar, TextInput, withTheme, Button, List, Text, IconButton, Colors, Paragraph} from 'react-native-paper';
import {URL_RPC,DB} from '../constants/API';
// Lấy kích thước màn hình thiết bị
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width

class KhachHangChiTiet extends React.Component {  
  constructor(props){
    super(props)
    console.log(props.route)
    if (props.route.params !== undefined){
      let {params} = props.route;
      this.state = {
        id: params.id,
        name: params.name,
        email: params.email,
        mobile: params.mobile,
        addressData:[]
      }
    }
    else {
      this.state = {
        id: null,
        name: '',
        email: '',
        mobile: '',
        addressData:[]
      }      
    }

  }
  componentDidMount(){
    if (this.state.id) {
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
                    "res.partner","search_read",[[["type", "=","delivery"],["parent_id", "=", this.state.id]]],{
                      "fields":["state_id","x_quan_huyen_id","x_phuong_xa_id","street","name","mobile"]
                    }]
          }
        })
        })
        .then((response) => response.json())
        .then((json) => {
          let data = []
          json.result.map(delivery => {
            let temp = {}
            temp.address = `${delivery.street},${delivery.x_phuong_xa_id[1] },${delivery.x_quan_huyen_id[1] },${delivery.state_id[1]}`
            temp.id = delivery.id
            temp.name = delivery.name
            temp.mobile = delivery.mobile
            data.push(temp)
          })
          this.setState({ addressData: data });
        })
        .catch((error) => console.error(error))
        .finally(() => {});       
    }
  }

  _renderItem = ({ item }) => (
    <List.Item
    title={item.name}
    style={{backgroundColor:'white'}}
    description={() => 
      (<View>
        <Paragraph>Số ĐT: {item.mobile}</Paragraph>
        <Paragraph>{item.address}</Paragraph>
      </View>)}
    left={props => <List.Icon {...props} icon="account"/>}
    right={props => <IconButton
      {...props}
      icon="trash-can-outline"
      color={Colors.red500}
      size={20}
      onPress={() => 
      { 
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
                        "res.partner","unlink",[[item.id,]]]
              }
            })
          })
          .then((response) => response.json())
          .then((results) => {
            console.log(results)
            if ('result' in results){
              let array = [...this.state.addressData]
              let index = array.indexOf(item)
              if (index !== -1){
                array.splice(index, 1)
                this.setState({addressData: array})
              }
            }
            else if ('error' in results){
              Alert.alert("Xóa địa chỉ thất bại")
            }
          })
          .catch((error) => Alert.alert("Xóa địa chỉ thất bại"))       
        }
      }
  />}
  />
  )
  _footer= () => {
    return(
      <List.Item
      style={{backgroundColor:'white'}}
      title="Thêm địa chỉ giao hàng"
      onPress={()=> console.log("Nhan")}
      disabled={this.state.id == null ? true : false}
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
            defaultValue={this.state.name}
            label="Họ tên"/>
          <TextInput
            autoCapitalize="none" 
            onChangeText={(email) => this.setState({email})}
            style={styles.customerForm}
            defaultValue={this.state.email}
            label="Email"/>
          <TextInput 
            onChangeText={(mobile) => this.setState({mobile})}
            style={styles.customerForm}
            defaultValue={this.state.mobile}
            label="Số điện thoại"/>
          <Text style={styles.titleAddress} >Sổ địa chỉ</Text>
          <FlatList
            data={this.state.addressData}
            renderItem={this._renderItem}
            ListFooterComponent={this._footer}
            keyExtractor={item => item.id.toString()}
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