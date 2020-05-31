import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, ActivityIndicator, Text} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import DotMoBan from './component/DotMoBan';
import { color } from 'react-native-reanimated';

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

// main
class ChoPhien extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
		  data: [],
		  isLoading: true
		};
  }
	componentDidMount() {
		  	fetch('http://192.168.1.100:8069/dotmoban', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						jsonrpc: '2.0',
						params:{}
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
	  console.log("prop o cho phien")
	  console.log(this.props)
    return (
		<DotMoBan {...data} navigation={this.props}/>
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
          <ActivityIndicator animating={true} style={styles.center} size='large'/>
        </View>
      )
    }  
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          extraData={this.state}
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          getItemLayout={this._getItemLayout}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

export default ChoPhien;

const styles = StyleSheet.create({
  center:{
	justifyContent: 'center',
	alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    flex: 1,
    padding: PRODUCT_ITEM_OFFSET,
  },
  item: {
    margin: PRODUCT_ITEM_OFFSET,
    overflow: 'hidden',
    borderRadius: 3,
    width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
      PRODUCT_ITEM_MARGIN,
    height: PRODUCT_ITEM_HEIGHT,
    flexDirection: 'column',
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  itemImage:{
    borderRadius: 3,
    height:125,
  },
  itemTitle: {
    fontSize: 14,
    overflow: 'hidden',
    height: 50,
  },
  itemPrice: {
	fontWeight: 'bold',
	color: 'red',
  },
  itemPriceClearance: {
  },
});