import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {ActivityIndicator,Appbar, withTheme} from 'react-native-paper';
import DotMoBan from '../component/DotMoBan';
import {connect} from 'react-redux';
import {DB, URL_RPC} from '../constants/API';

const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

class ChoPhien extends React.Component {
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
                      "x_dot_mb","search_read",[[['x_state_id', '=', 2]]],{
                        "fields":["x_name","x_product_id","x_to_date","x_from_date","x_uom_id",
                                  "x_gia_khoi_diem", "x_gia_hien_tai","x_tong_so_dh","write_date"]
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
		<DotMoBan {...this.props} data={data}/>
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
                  "x_dot_mb","search_read",[[['x_state_id', '=', 2]]],{
                    "fields":["x_name","x_product_id","x_to_date","x_from_date","x_uom_id",
                              "x_gia_khoi_diem", "x_gia_hien_tai","x_tong_so_dh","write_date"]
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
        <View style={styles.container}>
          <Appbar.Header>
              <Appbar.Content
              title="Chợ"
              style={{alignItems:'center'}}
              titleStyle={{color:theme.colors.title, fontSize:25}}
            /> 
          </Appbar.Header>          
          <ActivityIndicator animating={true} style={styles.center} size='small'/>
        </View>
      )
    }  
    return (
      <View style={styles.container}>
        <Appbar.Header>
            <Appbar.Content
            title="Chợ"
            style={{alignItems:'center'}}
            titleStyle={{color: theme.colors.title, fontSize:22}}
          /> 
        </Appbar.Header>
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

export default connect(mapStateToProps)(withTheme(ChoPhien)); 

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});