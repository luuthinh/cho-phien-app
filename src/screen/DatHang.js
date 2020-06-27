import React from 'react';
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native';
import {Card, Paragraph, IconButton, Colors} from 'react-native-paper';

const {width, height} = Dimensions.get('window')
const SCREEN_WIDTH = parseInt(width)
const IMAGE_HEIGHT = parseInt(SCREEN_WIDTH / 1.2)
export default class DatHang extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      soLuong : 1,
      tamTinh : 0,

    }
  }
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ';
    return money;
  }
  render() {
    var item = this.props.route.params
    return (
      <Card style={styles.container}>
        <Image source={{uri: `https://vuonnhatoi.odoo.com/web/content/x_dot_mb/${item.id}/x_image_512`,
                               method: "GET",
                               headers: {
                                 "Content-Type": "application/x-www-form-urlencoded",
                                 "X_Openerp": "e962ad24d1f1a6caaa094c30351d7f73d78476cc"
                               }
                      }}
                style={styles.imageView}
        />
        <View style={{marginTop:10,padding:10}}>
          <Paragraph>
            <Paragraph style={styles.itemTitle}>{item.x_product_id[1]} - </Paragraph>
            <Paragraph style={styles.itemPrice}>Giá: {this._formatCurency(item.x_gia_hien_tai)}</Paragraph>
          </Paragraph>
          <View style={styles.containerOrder}>
            <IconButton icon="minus" color={Colors.blueA700} size={30} onPress={()=> this.setState({soLuong:this.state.soLuong -1 })}/>
            <Text style={{fontSize:20}}>{this.state.soLuong} {item.x_uom_id[1]}</Text>
            <IconButton icon="plus" color={Colors.blueA700} size={30} onPress={()=> this.setState({soLuong:this.state.soLuong +1 })}/>
          </View>
          <View>
            <Paragraph>Tạm tính: {this.state.tamTinh}</Paragraph>
          </View>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
  imageView:{
    marginTop: 5,
    borderRadius:10,
    width:SCREEN_WIDTH - 10,
    height:IMAGE_HEIGHT,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemTitle: {
  fontSize: 20,
  overflow: 'hidden',
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  containerOrder:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  }
});