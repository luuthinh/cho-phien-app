import React from 'react';
import { Text, View,StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {Card, Paragraph} from 'react-native-paper';
import * as Progress from 'react-native-progress';
import moment from 'moment';

import {URL_IMAGE} from '../constants/API';

// Lấy kích thước màn hình thiết bị
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

// item size
const PRODUCT_ITEM_OFFSET = 5;

class DotMoBan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      eventDate:moment.duration(moment(this.props.data.item.x_to_date).diff(moment())),
      timeTotal: moment.duration(moment(this.props.data.item.x_to_date).diff(moment(this.props.data.item.x_from_date))),
      percent: 0,
      days:0,
      hours:"00",
      mins:"00",
      secs:"00",
    }
  }
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ'
    return money
  }
  updateTimer=()=>{
    const x = setInterval(()=>{
      let { eventDate, timeTotal} = this.state

      if(eventDate <=0){
        clearInterval(x)
      }else {
        eventDate = eventDate.subtract(1,"s")
        const percent = eventDate / timeTotal
        const days = eventDate.days().toString()
        const hours = eventDate.hours() > 9 ? eventDate.hours().toString() : "0" + eventDate.hours().toString()
        const mins = eventDate.minutes() > 9 ? eventDate.minutes().toString() : "0" + eventDate.minutes().toString()
        const secs = eventDate.seconds() > 9 ? eventDate.seconds().toString() : "0" + eventDate.seconds().toString()
        
        this.setState({
          percent,
          days,
          hours,
          mins,
          secs,
          eventDate
        })
      }
    },1000)
  }

  componentDidMount(){
    this.updateTimer()
  }

  render() {
    const item = this.props.data.item
    return (
        <TouchableOpacity
			activeOpacity= {1}
          	style={styles.container} 
          	onPress={() => {return this.props.navigation.navigate('Đặt hàng',item)}}>
            <Card.Cover style={styles.imageView} 
                        source={{uri: `${URL_IMAGE}/x_dot_mb/${item.id}/x_image_512/200x200`,
                                method: "GET",
                                headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "X_Openerp": this.props.sessionID,
                                }
                        }}
            />
            <View style={styles.detailView}>
              <Paragraph style={styles.itemTitle}>{item.x_product_id[1]}</Paragraph>
              <Paragraph style={styles.itemPrice}>Giá hiện tại: {this._formatCurency(item.x_gia_hien_tai)}</Paragraph>
              <Paragraph style={styles.itemPriceClearance}>Giá khởi điểm: {this._formatCurency(item.x_gia_khoi_diem)}</Paragraph>
              <Paragraph >Đã bán: {item.x_tong_so_dh}</Paragraph>
              <Text>
                {`Thời gian còn: ${this.state.days} ngày ${this.state.hours} : ${this.state.mins} : ${this.state.secs}`}
              </Text>
            </View>
          </TouchableOpacity>
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

export default connect(mapStateToProps)(DotMoBan);

const styles = StyleSheet.create({
    center:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      margin: PRODUCT_ITEM_OFFSET,
      overflow: 'hidden',
      borderRadius: 3,
	  flex: 1,
      flexDirection: 'row',
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
    imageView:{
	  borderRadius: 3,
	  width:150,
      height:150,
    },
    detailView:{
	  flex:2,
	  height:150,
	  padding:10,
    },
    itemTitle: {
	  fontSize: 20,
	  fontWeight: 'bold',
	  overflow: 'hidden',
    },
    itemPrice: {
      fontWeight: 'bold',
      color: 'red',
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