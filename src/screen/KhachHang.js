import React from 'react';
import {View,Text , Dimensions, FlatList, StyleSheet, RefreshControl, Image} from 'react-native';
import {connect} from 'react-redux';
import {ActivityIndicator, Card, Paragraph, FAB} from 'react-native-paper'
import {URL_RPC,DB,URL_IMAGE} from '../constants/API';

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
                      "fields":["name","mobile","email","state_id","x_quan_huyen_id","x_phuong_xa_id","street"]
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
    return (
      <View style={styles.containerList}>
          <Card.Cover style={styles.imageView}                       
                        source={{uri: `${URL_IMAGE}/res.partner/${data.item.id}/image_128/96x96`,
                                  method: "POST",
                                  headers: {
                                    Pragma: 'no-cache',
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "X_Openerp": this.props.sessionID,
                                  }
                          }}
          />
          <View style={styles.details}>
            <Paragraph style={styles.itemName}>{data.item.name}</Paragraph>
            <Paragraph style={styles.itemDetail}>Số ĐT: {data.item.mobile}</Paragraph>
            <Paragraph style={styles.itemDetail}>{data.item.street}, {data.item.x_phuong_xa_id[1]}, {data.item.x_quan_huyen_id[1]}, {data.item.state_id[1]}</Paragraph>
          </View>
      </View>
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
                    "fields":["name","mobile","email","state_id","x_quan_huyen_id","x_phuong_xa_id","street"]
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
  _getItemLayout = (data, index) => {
    return {
      length: 100,
      offset: 100 * index,
      index,
    };
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} size='small'/>
        </View>
      )
    }  
    return (
      <View style={styles.container}>
        <FlatList
          extraData={this.state}
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          getItemLayout={this._getItemLayout}
          refreshControl={<RefreshControl refreshing={this.state.isRefreshing}
                                          onRefresh={this._onRefresh}
                          />}
        />
        <FAB
            small
            icon="feather"
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

export default connect(mapStateToProps)(KhachHang); 

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white',
  },
  containerList:{
    flex:1,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderColor: '#eeeeee',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    margin: 5,
    borderRadius: 3,
  },
  imageView:{
	  borderRadius: 10,
	  width:96,
    height:96 ,
  },
  details: {
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
    color: '#666666'
  },
  fab:{
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});