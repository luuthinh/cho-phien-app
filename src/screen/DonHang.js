import React from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, FlatList,  RefreshControl, } from 'react-native';
import {connect} from 'react-redux';
import {Appbar, withTheme, IconButton, Paragraph, ActivityIndicator, Card, Dialog, Button, Portal} from 'react-native-paper';
import {URL_RPC,DB, URL_IMAGE} from '../constants/API';

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
                        "x_dot_mb_don_hang","search_read",[],{
                            "fields":["x_name","x_product_id","x_so_luong","x_trang_thai"]
                        }]
                }
            })
            })
            .then((response) => response.json())
            .then((json) => {
                let data = []
                json.result.map(order => {
                order.x_name[1] = order.x_name[1].split(",")[1]
                let temp = {}
                temp.id = order.id
                temp.customerID = order.x_name
                temp.productID = order.x_product_id
                temp.qty = order.x_so_luong
                temp.state = order.x_trang_thai
                temp.menuVisible = false
                data.push(temp)
                })
                this.setState({ orderData: data});
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
                    "x_dot_mb_don_hang","search_read",[],{
                        "fields":["x_name","x_product_id","x_so_luong","x_trang_thai"]
                    }]
            }
        })
        })
        .then((response) => response.json())
        .then((json) => {
            let data = []
            json.result.map(order => {
            order.x_name[1] = order.x_name[1].split(",")[1]
            let temp = {}
            temp.id = order.id
            temp.customerID = order.x_name
            temp.productID = order.x_product_id
            temp.qty = order.x_so_luong
            temp.state = order.x_trang_thai
            data.push(temp)
            })
            this.setState({ orderData: data, isRefreshing:false });
        })
        .catch((error) => console.error(error))
        .finally(() => {});       
      }
      _renderItem = ({ item }) => {
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
                    <Paragraph style={styles.itemDetail}>{item.productID[1]}</Paragraph>
                    <Paragraph style={styles.itemDetail}>Số lượng: {item.qty}</Paragraph>
                </View>
                <View style={styles.menuView}>
                <IconButton
                    icon="menu"
                    color={this.props.theme.colors.text}
                    size={30}
                    onPress={() => {
                        this.setState({visible:true, dataDialog:item})}}
                    />
                </View>
            </Card.Content>
        </Card>
      );
    }
    render() {
        const theme = this.props.theme
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
                    {Object.keys(this.state.dataDialog).length ?
                        <Dialog visible={this.state.visible} onDismiss={()=> {this.setState({visible:false})}}>
                            <Dialog.Title>{this.state.dataDialog.productID[1]}</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>This is simple dialog</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={()=> {this.setState({visible:false})}}>Done</Button>
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
    }
  });