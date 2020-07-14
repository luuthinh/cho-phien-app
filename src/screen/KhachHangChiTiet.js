import React from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Appbar, TextInput, withTheme, Button, List, Text, IconButton, Colors} from 'react-native-paper';

// Lấy kích thước màn hình thiết bị
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width

class KhachHangChiTiet extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addressData:[
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ]
    }
  }
  componentDidMount(){
  }

  _renderItem = ({ item }) => (
    <List.Item
    title={item.title}
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
      title="Thêm địa chỉ giao hàng"
      onPress={()=> console.log("Nhan")}
      left={props => <List.Icon {...props} icon="plus" />}
      />
    )
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
          <TextInput style={styles.customerForm}
            label="Họ tên"/>
          <TextInput style={styles.customerForm}
            label="Email"/>
          <TextInput style={styles.customerForm}
            label="Số điện thoại"/>
          <Text style={styles.titleAddress} >Sổ địa chỉ</Text>
          <FlatList
            data={this.state.addressData}
            renderItem={this._renderItem}
            ListFooterComponent={this._footer}
            keyExtractor={item => item.id}
          />  
          <Button
            style={styles.saveButton}
            mode = 'contained'
            labelStyle={{color:'white'}}
          >Lưu thông tin</Button>                      
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