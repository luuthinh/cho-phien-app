import React from 'react';
import {View, Dimensions, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {ActivityIndicator, Card, Paragraph, FAB, withTheme, Appbar, Avatar, Button, Text, IconButton} from 'react-native-paper'
import {URL_RPC,DB,URL_PARTNER} from '../constants/API';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window')
class KhachHang extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
		  data: [],
      isLoading: true,
      isRefreshing: false,
      error: '',
		};
  }
	componentDidMount() {
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
                      "res.partner","search_read",[[["type", "=","contact"],['is_company','=',false]]],{
                      "fields":["name","mobile","email","write_date",
                                "x_so_gio_hang","x_so_don_hang","x_so_giao_hang","x_so_hoan_thanh","x_so_huy_dh"]
                      }]
            }
					})
					})
					.then((response) => response.json())
					.then((json) => {
					  this.setState({ data: json.result });
					})
					.catch((error) => console.error(error))
					.finally(() => {
					  this.setState({ isLoading: false });
					});
	  }
	_keyExtractor = item => {
		return item.id.toString();
	};
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ';
    return money;
  }
  _renderItem = data => {
    console.log(data)
    return (
      <Card style={styles.container}>
        <Card.Content style={styles.content}>
          <Card.Cover style={styles.imageView}                       
                          source={{uri: `${URL_PARTNER}/${data.item.id}#time=${data.item.write_date}`,
                                    method: "GET",
                                    headers: {
                                      "Content-Type": "application/x-www-form-urlencoded",
                                      "X_Openerp": this.props.sessionID,
                                    }
                            }}
            />
            <View style={styles.detailView}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.itemName}>{data.item.name}</Text>
                <IconButton
                  icon="pencil-outline"
                  size={20}
                  onPress={() => {return this.props.navigation.navigate("Thông tin khách hàng",data.item)}}
                />
              </View>
              <Paragraph style={styles.itemDetail}>Email: {data.item.email}</Paragraph>
              <Paragraph style={styles.itemDetail}>Số ĐT: {data.item.mobile}</Paragraph>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>console.log("123")} style={styles.itemDH}>
                  <Text>{data.item.x_so_gio_hang}</Text>
                  <Icon
                      name='cart-outline'
                      color='blue'
                      style={{marginLeft:3}} 
                      size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>console.log("123")} style={styles.itemDH}>
                  <Text>{data.item.x_so_don_hang}</Text>
                  <Icon
                      name='square-edit-outline'
                      color='blue'
                      style={{marginLeft:3}} 
                      size={20}
                  />
                </TouchableOpacity>  
                <TouchableOpacity onPress={()=>console.log("123")} style={styles.itemDH}>
                  <Text>{data.item.x_so_giao_hang}</Text>
                  <Icon
                      name='truck-delivery'
                      color='blue'
                      style={{marginLeft:3}} 
                      size={20}
                  />
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=>console.log("123")} style={styles.itemDH}>
                  <Text>{data.item.x_so_hoan_thanh}</Text>
                  <Icon
                      name='marker-check'
                      color='blue'
                      style={{marginLeft:3}} 
                      size={20}
                  />
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=>console.log("123")} style={styles.itemDH}>
                  <Text>{data.item.x_so_huy_dh}</Text>
                  <Icon
                      name='cancel'
                      color='blue'
                      style={{marginLeft:3}} 
                      size={20}
                  />
                </TouchableOpacity>                                                               
              </View>
            </View>
        </Card.Content>
      </Card>
    );
  };

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
                  "res.partner","search_read",[[["type", "=","contact"],['is_company','=',false]]],{
                    "fields":["name","mobile","email","write_date",
                              "x_so_gio_hang","x_so_don_hang","x_so_giao_hang","x_so_hoan_thanh","x_so_huy_dh"]
                  }]
        }
      })
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.result });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isRefreshing: false });
      });    

  }
  render() {
    const theme = this.props.theme;
    if (this.state.isLoading) {
      return (
        <View>
          <Appbar.Header>
              <Appbar.Content
              title="Khách hàng"
              style={{alignItems:'center'}}
              titleStyle={{color: theme.colors.title, fontSize:22}}
            /> 
          </Appbar.Header>          
          <ActivityIndicator animating={true} size='small'/>
        </View>
      )
    }  
    return (
      <View style={{flex:1}}>
        <Appbar.Header>
            <Appbar.Content
            title="Khách hàng"
            style={{alignItems:'center'}}
            titleStyle={{color: theme.colors.title, fontSize:22}}
          /> 
        </Appbar.Header>
        <FlatList
          extraData={this.state}
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshControl={<RefreshControl refreshing={this.state.isRefreshing}
                                          onRefresh={this._onRefresh}
                          />}
        />
        <FAB
            small
            icon="feather"
            color='white'
            style={{
              position: 'absolute',
              margin: 16,
              bottom: 16,
              right: 0,
            }}
            onPress={() => {return this.props.navigation.navigate("Thông tin khách hàng")}}
        />
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
  };
}

export default connect(mapStateToProps)(withTheme(KhachHang)); 

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
    width: width - 96,
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
  itemDH:{
    height:24,
    borderStyle:'solid',
    borderColor:'red',
    borderWidth:1,
    flexDirection: 'row',
    marginLeft:3,
    borderRadius:6,
  
  }
});