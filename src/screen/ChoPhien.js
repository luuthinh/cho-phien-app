import React from 'react';
import { View, FlatList, StyleSheet, Dimensions} from 'react-native';
import {ActivityIndicator,} from 'react-native-paper';
import DotMoBan from '../component/DotMoBan';
import {connect} from 'react-redux';
import {DB} from '../constants/API';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;
// item size
const PRODUCT_ITEM_HEIGHT = 255;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

class ChoPhien extends React.Component {
	constructor(props) {
    super(props);
    console.log("chợ phiên")
    console.log(this.props)
		this.state = {
		  data: [],
		  isLoading: true
		};
  }
	componentDidMount() {
		  	fetch('https://vuonnhatoi.odoo.com/jsonrpc', {
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
                      "x_dot_mb","search_read",[],{
                        "fields":["x_name","x_product_id","x_to_date",
                                  "x_gia_khoi_diem", "x_gia_hien_tai","x_tong_so_dh"]
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
		return item.id;
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

export default connect(mapStateToProps)(ChoPhien); 

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white'
  }
});