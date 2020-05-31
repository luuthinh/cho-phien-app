import React from 'react';
import { Text, View,StyleSheet,Dimensions } from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import * as Progress from 'react-native-progress';

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

export default class DotMoBan extends React.Component {
  constructor(props){
    super(props)
  }
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ';
    return money;
  }
  render() {
    console.log('dot mo ban nè')
    console.log(this.props)
    var item = this.props.item
    return (
        <View style={styles.item}>
        <Card onPress={() => {
			console.log("item")
			console.log(item)
            return this.props.navigation.navigation.push('Đặt hàng',item)}}> 
          <Card.Cover style={styles.itemImage} source={{uri: `data:image/jpeg;base64,${item.bsd_image_512}}`}}/>
          <Paragraph style={styles.itemTitle}>{item.bsd_product_id[1]}</Paragraph>
        	<Paragraph style={styles.itemPrice}>Giá hiện tại: {this._formatCurency(100000)}</Paragraph>
          <Paragraph style={styles.itemPriceClearance}>Giá khởi điểm: {this._formatCurency(150000)}</Paragraph>
		  <Progress.Bar progress={0.9} color='red' height={19} backgroundColor='gray'>
			<Text style={{alignSelf:"center",color:'white',position:"absolute",top:0.5}}>selected week 8</Text>
</Progress.Bar>
        </Card>
      </View>
    );
  }
}

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