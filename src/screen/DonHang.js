import React from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, FlatList, Alert, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {Appbar, TextInput, withTheme, Button, List, Text, IconButton, Colors, Paragraph, ActivityIndicator} from 'react-native-paper';
import {URL_RPC,DB} from '../constants/API';
class DonHang extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            isRefreshing : false,
            orderData: [],
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
                let temp = {}
                temp.id = order.id
                temp.customerID = order.x_name
                temp.productID = order.x_product_id
                temp.qty = order.x_so_luong
                temp.state = order.x_trang_thai
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
      _renderItem = ({ item }) => (
        <List.Item
        title={item.customerID[1]}
        style={{backgroundColor:'white'}}
        description={() => 
          (<View>
            <Paragraph>{item.productID[1]}</Paragraph>
            <Paragraph>{item.qty}</Paragraph>
          </View>)}
        left={props => <List.Icon {...props} icon="account"/>}
        right={props => <IconButton
          {...props}
          icon="trash-can-outline"
          color={Colors.red500}
          size={20}
      />}
      />
      )
    render() {
        console.log(this.state.orderData)
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