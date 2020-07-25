import React from 'react';
import { Text, View, Dimensions, StyleSheet, Alert, SafeAreaView, ScrollView} from 'react-native';
import {Paragraph, IconButton, Button, Appbar, withTheme, Card} from 'react-native-paper';
import {connect} from 'react-redux';
import {URL_IMAGE,DB, URL_RPC} from '../constants/API';
import Many2one from '../component/Many2one';
import Selection from '../component/Selection';

const {width} = Dimensions.get('window')
const SCREEN_WIDTH = parseInt(width)
const IMAGE_HEIGHT = 200
const IMAGE_WIDTH = 200

class DatHang extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      soLuong : 1,
      tamTinh : this.props.route.params.x_gia_ban,
      customerID: {},
      disabledAddress: true,
      addressData: [],
      addressID: null
    }
  }
	componentDidMount() {
}
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ';
    return money;
  }
  _order = () => {
    if (!Object.keys(this.state.customerID).length){
      Alert.alert("Chưa chọn khách hàng")
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
                  "x_don_hang","create",[{
                    "x_kh_id":this.state.customerID.id,
                    "x_ctv_id":this.props.partnerID,
                    "x_sp_id": this.props.route.params.x_sp_id[0],
                    "x_so_luong": this.state.soLuong,
                    "x_trang_thai": "don_hang",
                    "x_dot_mb_id": this.props.route.params.id,
                    "x_dia_chi_id": this.state.addressID,
                    "x_gia_ban": this.state.tamTinh,
                    "x_thanh_toan": 'chua_tt',
                    "x_uu_tien": 'bt'
                  }]]
        }
      })
    })
    .then((response) => response.json())
    .then((results) => {
      if ('result' in results){
        Alert.alert("Đặt hàng thành công")
      }
      else if ('error' in results){
        console.log(results)
        Alert.alert("Đặt hàng thất bại")
      }
    })
    .catch((error) => Alert.alert("Đặt hàng thất bại"))
    }
  }

  _onselect = (item) => {
    this.setState({customerID:item})
    if (Object.keys(item).length) {
      this.setState({disabledAddress:false})
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
                    "res.partner","search_read",[[["type", "=","delivery"],["parent_id", "=", item.id]]],{
                      "fields":["state_id","x_qh_id","x_px_id","street","name","mobile"]
                    }]
          }
        })
        })
        .then((response) => response.json())
        .then((json) => {
          let data = []
          json.result.map(delivery => {
            let temp = {}
            temp.label = `${delivery.street || ''}, ${delivery.x_px_id[1] || '' }, ${delivery.x_qh_id[1] || ''}, ${delivery.state_id[1] || ''}`
            temp.value = delivery.id
            temp.name = delivery.name
            temp.mobile = delivery.mobile
            data.push(temp)
          })
          this.setState({ addressData: data });
        })
        .catch((error) => console.error(error))
        .finally(() => {
        });       
    }
    else{
      this.setState({disabledAddress:true})
    }
  }

  render() {
    const item = this.props.route.params
    const theme = this.props.theme
    return (
      <SafeAreaView style={{flex:1}}>
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
        <ScrollView style={{flex:1}}>
          <Card>
            <Card.Cover source={{uri: `${URL_IMAGE}/x_dot_mb/${item.id}/x_image_512#time=${item.write_date}`,
                                    method: "GET",
                                    headers: {
                                      "Content-Type": "application/x-www-form-urlencoded",
                                      "X_Openerp": this.props.sessionID,
                                    }
                          }}
                    style={styles.imageView}
            /> 
            <View style={styles.detailView}></View>
              <View>
                <Paragraph style={styles.itemTitle}>{item.x_sp_id[1]} - Giá: {this._formatCurency(item.x_gia_ban)}</Paragraph>
              </View>   
              <View style={[styles.containerOrder, {borderColor: theme.colors.primary}]}>
                <IconButton icon="minus" 
                            color={theme.colors.accent}
                            size={27}
                            style={{backgroundColor: theme.colors.primary, marginLeft:0}}
                            onPress={()=> this.setState({soLuong:this.state.soLuong -1, tamTinh:(this.state.soLuong -1)*item.x_gia_ban})}/>
                <Text style={{fontSize:20, color:theme.colors.text}}>{this.state.soLuong} {item.x_dvt_id[1]}</Text>
                <IconButton 
                  icon="plus" 
                  style={{backgroundColor: theme.colors.primary, marginRight:0}}
                  color={theme.colors.accent} size={27} 
                  onPress={()=> this.setState({soLuong:this.state.soLuong +1, tamTinh:(this.state.soLuong +1)*item.x_gia_ban})}/>
              </View>  
              <View>
              <Paragraph style={styles.totalprice}>Tạm tính: {this._formatCurency(this.state.tamTinh)}</Paragraph>
              <Many2one 
                model="res.partner"
                uid={this.props.uid}
                password={this.props.password}
                db={DB}
                url={URL_RPC}
                domain={[['type', '=', 'contact']]} 
                placeholder='Chọn khách hàng'
                label='Khách hàng'
                onSelect={this._onselect}
              />
              <Selection
                label="Chọn địa chỉ"
                onSelect={(item) => this.setState({addressID:item.value})}
                items={this.state.addressData}/>
              <Button mode="contained"
                      style={{marginTop:20}}
                      labelStyle={{color:'white'}}
                      color={theme.colors.primary} 
                      onPress={this._order}>Đặt hàng</Button>
            </View>                        
          </Card>
        </ScrollView>
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
    partnerID: state.auth.partnerID
  };
}

export default connect(mapStateToProps)(withTheme(DatHang));

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
  },
  imageView:{
    borderRadius:10,
    width: IMAGE_WIDTH,
    height:IMAGE_HEIGHT,
    resizeMode: 'stretch',
    marginLeft: (SCREEN_WIDTH - IMAGE_WIDTH) /2
  },
  detailView:{
    marginTop:10,
    flex:1
  },
  itemTitle: {
  fontSize: 16,
  overflow: 'hidden',
  marginLeft: 10
  },
  containerOrder:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 2,
    width: "60%",
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20
  },
  totalprice:{
    fontSize: 16,
    marginLeft: 10
  }
});