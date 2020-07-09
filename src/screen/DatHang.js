import React from 'react';
import { Text, View, Dimensions, StyleSheet, Image, Alert} from 'react-native';
import {Paragraph, IconButton, Button, Appbar, withTheme} from 'react-native-paper';
import {connect} from 'react-redux';
import {URL_IMAGE,DB, URL_RPC} from '../constants/API';
import Many2one from '../component/Many2one';

const {width} = Dimensions.get('window')
const SCREEN_WIDTH = parseInt(width)
const IMAGE_HEIGHT = parseInt(SCREEN_WIDTH)

class DatHang extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      soLuong : 1,
      tamTinh : this.props.route.params.x_gia_hien_tai,
      customer: {}, 
    }
  }
	componentDidMount() {
}
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ';
    return money;
  }
  _order = () => {
    if (this.state.customerID === []){
      Alert.alert("Chưa chọn khách hàng")
    }
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
                  "x_dot_mb_don_hang","create",[{
                    "x_name":this.state.customerID[0],
                    "x_ctv_id":this.props.partnerID,
                    "x_product_id": this.props.route.params.x_product_id[0],
                    "x_so_luong": this.state.soLuong,
                    "x_trang_thai": "don_hang",
                    "x_dot_mb_id": this.props.route.params.id 
                  }]]
        }
      })
    })
    .then((response) => response.json())
    .then((json) => {
        console.log("lỗi")
        console.log(json.error)
        Alert.alert("Đặt hàng thành công")
      })
      .catch((error) => console.error(error))
      .finally(() => {
      });
  }
  render() {
    const item = this.props.route.params
    const theme = this.props.theme
    console.log(this.state)
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.props.navigation.goBack} color={theme.colors.title} size={30}/>
          <Appbar.Content title="Đặt hàng" color={theme.colors.title} titleStyle={{fontSize:20}}/>
          <Appbar.Action 
            style={{position: 'absolute', right: 0}}
            icon="cart-outline"
            color={theme.colors.title}
            size={30}
            onPress={() => console.log('Pressed archive')} />
        </Appbar.Header>
        <Image source={{uri: `${URL_IMAGE}/x_dot_mb/${item.id}/x_image_512`,
                                method: "GET",
                                headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "X_Openerp": this.props.sessionID,
                                }
                      }}
                style={styles.imageView}
        />
        <View style={styles.detailView}>
          <View>
            <Paragraph style={styles.itemTitle}>{item.x_product_id[1]} - Giá: {this._formatCurency(item.x_gia_hien_tai)}</Paragraph>
          </View>
          <View style={styles.containerOrder}>
            <IconButton icon="minus" 
                        color={theme.colors.primary}
                        size={20} 
                        onPress={()=> this.setState({soLuong:this.state.soLuong -1, tamTinh:(this.state.soLuong -1)*item.x_gia_hien_tai})}/>
            <Text style={{fontSize:20}}>{this.state.soLuong} {item.x_uom_id[1]}</Text>
            <IconButton icon="plus" color={theme.colors.primary} size={20} onPress={()=> this.setState({soLuong:this.state.soLuong +1, tamTinh:(this.state.soLuong +1)*item.x_gia_hien_tai})}/>
          </View>
          <View>
            <Paragraph style={styles.totalprice}>Tạm tính: {this._formatCurency(this.state.tamTinh)}</Paragraph>
            <Many2one 
              model="res.parner"
              uid={this.props.uid}
              password={this.props.password}
              db={DB}
              url={URL_RPC}
              title='Chọn khách hàng'
              onSelect={(item) => this.setState({customer:item})}
            />
            <Button mode="contained"
                    style={{marginTop:20}}
                    labelStyle={{color:'white'}}
                    color={theme.colors.primary} 
                    onPress={this._order}>Đặt hàng</Button>
          </View>
        </View>
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

export default connect(mapStateToProps)(withTheme(DatHang));

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
  },
  imageView:{
    margin: 5,
    borderRadius:10,
    width:SCREEN_WIDTH -10,
    height:IMAGE_HEIGHT,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailView:{
    marginTop:10,
  },
  itemTitle: {
  fontSize: 20,
  overflow: 'hidden',
  },
  containerOrder:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  totalprice:{
    fontSize: 20,
    padding: 5,
  }
});