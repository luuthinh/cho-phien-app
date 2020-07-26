import React from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, FlatList, Alert, RefreshControl, } from 'react-native';
import {connect} from 'react-redux';
import {Appbar, withTheme, IconButton, Paragraph, ActivityIndicator, Card, List, Dialog, Button, Portal, Text, RadioButton} from 'react-native-paper';
import {URL_RPC,DB, URL_IMAGE} from '../constants/API';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { or } from 'react-native-reanimated';

const {width, height} = Dimensions.get('window')

class DonHang extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            isRefreshing : false,
            orderData: [],
            visible: false,
            dataDialog: {},
        }      
      }

    componentDidMount(){
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
                        "x_don_hang","search_read",[[['x_trang_thai', '=', 'don_hang']]],{
                            "fields":["x_kh_id","x_sp_id","x_so_luong","x_thanh_toan","x_gia_ban","x_dvt_id"]
                        }]
                }
            })
            })
            .then((response) => response.json())
            .then((json) => {
              let data = []
              json.result.map(order => {
              order.x_kh_id[1] = order.x_kh_id[1].split(",")[1]
              let temp = {}
              temp.id = order.id
              temp.customerID = order.x_kh_id
              temp.productID = order.x_sp_id
              temp.qty = order.x_so_luong
              temp.paid = order.x_thanh_toan
              temp.price = order.x_gia_ban
              temp.uom = order.x_dvt_id
              data.push(temp)
              })
              this.setState({ orderData: data, isRefreshing:false });
            })
            .catch((error) => console.error(error))
            .finally(() => {this.setState({ isLoading: false });});        
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true});   
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
                    "x_don_hang","search_read",[[['x_trang_thai', '=', 'don_hang']]],{
                        "fields":["x_kh_id","x_sp_id","x_so_luong","x_thanh_toan","x_gia_ban","x_dvt_id"]
                    }]
            }
        })
        })
        .then((response) => response.json())
        .then((json) => {
            let data = []
            json.result.map(order => {
            order.x_kh_id[1] = order.x_kh_id[1].split(",")[1]
            let temp = {}
            temp.id = order.id
            temp.customerID = order.x_kh_id
            temp.productID = order.x_sp_id
            temp.qty = order.x_so_luong
            temp.paid = order.x_thanh_toan
            temp.price = order.x_gia_ban
            temp.uom = order.x_dvt_id
            data.push(temp)
            })
            this.setState({ orderData: data, isRefreshing:false });
        })
        .catch((error) => console.error(error))
        .finally(() => {});       
      }
      _renderItem = ({ item }) => {
          console.log(item)
          return (
        <Card style={styles.container} 
            onPress={() => {}}>
            <Card.Content style={styles.content}>
                <Card.Cover style={styles.imageView}                       
                                source={{uri: `${URL_IMAGE}/product.product/${item.productID[0]}/image_128/96x96`,
                                        method: "GET",
                                        headers: {
                                            "Content-Type": "application/x-www-form-urlencoded",
                                            "X_Openerp": this.props.sessionID,
                                        }
                                }}
                />
                <View style={styles.detailView}>
                    <Paragraph style={styles.itemName}>{item.customerID[1]}</Paragraph>
                    <Paragraph style={styles.itemDetail}>{item.productID[1]} Số lượng: {item.qty} {item.uom[1]}</Paragraph>
                    <Paragraph style={styles.itemDetail}>Giá: {this._formatCurency(item.price)}</Paragraph>
                    <Paragraph style={styles.itemDetail}>Thanh toán:   
                      <Icon
                      name="cash-multiple"
                      color={item.paid == 'chua_tt' ? '#777777' : this.props.theme.colors.primary}
                      size={20}/>
                      </Paragraph>
                </View>
                <View style={styles.menuView}>
                <IconButton
                    icon="menu"
                    color={this.props.theme.colors.text}
                    size={30}
                    onPress={() => {
                        this.setState({visible:true, dataDialog:{...item,choose:"thu"}})}}
                    />
                </View>
            </Card.Content>
        </Card>
      );
    }
    _formatCurency = (money) => {
      money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ'
      return money
    }    
    _action_xac_nhan = (item) => {
      console.log(item)
      if (item.choose == 'thu'){
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
                      "x_don_hang","write",[[item.id],{
                        'x_thanh_toan': 'da_tt'
                      }]]
              }
          })
          })
          .then((response) => response.json())
          .then((results) => {
            if ('result' in results){
              this.setState({visible:false})
            }
            else if ('error' in results){
              Alert.alert("Lỗi thu tiền")
            }            
          })
          .catch((error) => console.error(error))
          .finally(() => {});
      }
      else if (item.choose == 'huy'){
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
                      "x_don_hang","write",[[item.id],{
                        'x_trang_thai': 'huy'
                      }]]
              }
          })
          })
          .then((response) => response.json())
          .then((results) => {
            if ('result' in results){
              this.setState({visible:false})
              for (let index in orderData){
                const orderData = this.state.orderData
                if (orderData[index].id === item.id){
                  const filteredItems = items.slice(0, i).concat(items.slice(i + 1, items.length))
                }
            }
            }
            else if ('error' in results){
              Alert.alert("Lỗi hủy đơn hàng")
            }            
          })
          .catch((error) => console.error(error))
          .finally(() => {});        
      }
    }
    render() {
        const {theme} = this.props
        const {dataDialog, visible} = this.state
        if (this.state.isLoading) {
            return (
                <View>
                    <Appbar.Header>
                        <Appbar.Content
                        title="Đơn hàng"
                        style={{alignItems:'center'}}
                        titleStyle={{color: theme.colors.title, fontSize:22}}
                    /> 
                    </Appbar.Header>          
                    <ActivityIndicator animating={true} size='small'/>
                </View>
            )
        }         
        return (
          <SafeAreaView style={{flex:1}}>
                <Appbar.Header>
                    <Appbar.Content
                    title="Đơn hàng"
                    style={{alignItems:'center'}}
                    titleStyle={{color: theme.colors.title, fontSize:22}}
                  /> 
                </Appbar.Header>
                <View style={{flex:1}}>
                    <FlatList
                        data={this.state.orderData}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.id.toString()}
                        refreshControl={<RefreshControl refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}/>}
                    />  
                </View>
                <Portal>
                    {Object.keys(dataDialog).length ?
                        <Dialog visible={visible} onDismiss={()=> {this.setState({visible:false})}}>
                            <Dialog.Title>
                              <Paragraph>{dataDialog.customerID[1]}</Paragraph>
                              <Paragraph>Sản phẩm: {dataDialog.productID[1]}</Paragraph>
                              <Paragraph>Số lượng: {dataDialog.qty}</Paragraph>
                            </Dialog.Title>

                        <Dialog.Content>
                            <RadioButton.Group 
                              onValueChange={value=>{
                                dataDialog.choose = value
                                this.setState(dataDialog)
                              }} 
                              value={dataDialog.choose}>
                              <List.Item 
                                title="Thu tiền"
                                left={props => <List.Icon {...props} icon="currency-usd"/>}
                                disabled={true}
                                right={props => <RadioButton value="thu"/>}
                              />
                              <List.Item 
                                title="Hủy đơn hàng"
                                left={props => <List.Icon {...props} icon="trash-can-outline"/>}
                                disabled={true}
                                right={props => <RadioButton value="huy"/>}
                              /> 
                            </RadioButton.Group>                           
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button 
                              mode='outlined'
                              style={styles.button}
                              onPress={()=> {this.setState({visible:false})}}>
                                  Hủy
                              </Button>
                            <Button 
                              mode='contained'
                              style={styles.button}
                              onPress={()=> {this._action_xac_nhan(dataDialog)}}>
                                <Text style={{color:'white'}}>
                                  Xác nhận
                                </Text>                                
                              </Button>
                        </Dialog.Actions>
                        </Dialog>
                    : null}
                </Portal>              
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
  
export default connect(mapStateToProps)(withTheme(DonHang));

const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop: 3
    },
    content:{
      flex:1,
      flexDirection: 'row',
      margin: -12,
      borderRadius: 3,
    },
    imageView:{
        borderRadius: 10,
        width:96,
        height:96 ,
    },
    detailView: {
      marginLeft: 10,
      overflow: 'visible',
      width: width - 156,
    },
    itemName:{
      fontWeight: '300',
      fontSize: 20
    },
    itemDetail:{
      fontWeight: '100',
    },
    fab:{
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    menuView:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
      height: 36, flex: 1
    },
  });