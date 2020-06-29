import React from 'react';
import {View,Text , FlatList, StyleSheet, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {ActivityIndicator, Card, Avatar, IconButton} from 'react-native-paper'
import {URL_RPC,DB} from '../constants/API';

const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

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
                      "res.partner","search_read",[],{
                      "fields":["name","mobile","email"]
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
			<Card.Title
			title={data.item.name}
			subtitle={data.item.email}
			left={(props) => <Avatar.Icon {...props} icon="folder" />}
			right={(props) => <IconButton {...props} icon="dots-horizontal" onPress={() => {}} />}
		/>
    );
  };

  _getItemLayout = (data, index) => {
    const productHeight = PRODUCT_ITEM_HEIGHT + PRODUCT_ITEM_MARGIN;
    return {
      length: productHeight,
      offset: productHeight * index,
      index,
    };
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
                  "res.partner","search_read",[],{
                    "fields":["name","mobile","email"]
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
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} style={styles.center} size='small'/>
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
    backgroundColor: 'white'
  }
});