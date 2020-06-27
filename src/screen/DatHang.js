import React from 'react';
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import {Card, Paragraph} from 'react-native-paper';

const {width, height} = Dimensions.get('window')
const SCREEN_WIDTH = parseInt(width)
const IMAGE_HEIGHT = parseInt(SCREEN_WIDTH / 1.2)
export default class DatHang extends React.Component {
  constructor(props){
    super(props)
  }
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ';
    return money;
  }
  render() {
    var item = this.props.route.params
    return (
      <View style={styles.container}>
        <Image source={{uri: `https://vuonnhatoi.odoo.com/web/content/x_dot_mb/${item.id}/x_image_512`,
                               method: "GET",
                               headers: {
                                 "Content-Type": "application/x-www-form-urlencoded",
                                 "X_Openerp": "e962ad24d1f1a6caaa094c30351d7f73d78476cc"
                               }
                      }}
                style={styles.imageView}
        />
        <Card.Content>
          <Paragraph>
          <Paragraph style={styles.itemTitle}>{item.x_product_id[1]} - </Paragraph>
          <Paragraph style={styles.itemPrice}>Giá: {this._formatCurency(item.x_gia_hien_tai)}</Paragraph>
          </Paragraph>
          {/* <Text>
            {`Thời gian còn: ${this.state.days} ngày ${this.state.hours} : ${this.state.mins} : ${this.state.secs}`}
          </Text> */}
        </Card.Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white'
  },
  imageView:{
    width:SCREEN_WIDTH,
    height:IMAGE_HEIGHT,
    resizeMode: 'contain'
  },
  detailView:{
  flex:2,

  padding:10,
  },
  itemTitle: {
  fontSize: 20,
  overflow: 'hidden',
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemPriceClearance: {
    textDecorationLine: 'line-through'
  },
  day:{
    fontSize: 12,
    color: "#ff0",
    textAlign:"right"
   },
   small:{
    fontSize: 16,
    color: "#faa"
   }   
});