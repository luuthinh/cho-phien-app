import React from 'react';
import {View,StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {Card, Paragraph} from 'react-native-paper';
import moment from 'moment';

import {URL_IMAGE} from '../constants/API';

// Lấy kích thước màn hình thiết bị
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

// item size
const PRODUCT_ITEM_OFFSET = 3;

class DotMoBan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      eventDate:moment.duration(moment(this.props.data.item.x_ngay_kt).diff(moment())),
      timeTotal: moment.duration(moment(this.props.data.item.x_ngay_kt).diff(moment(this.props.data.item.x_ngay_bd))),
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
        <Card
          style={styles.container}
          onPress={() => {return this.props.navigation.navigate('Đặt hàng',item)}}>
          <Card.Content style={styles.content} >
            <Card.Cover style={styles.imageView} 
                          source={{uri: `${URL_IMAGE}/product.template/${item.x_sp_id[0]}/image_1920/96x96#time=${item.write_date}`,
                                  method: "GET",
                                  headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "X_Openerp": this.props.sessionID,
                                  }
                          }}
              />
              <View style={styles.detailView}>
                <Paragraph style={styles.itemTitle}>{item.x_sp_id[1]}</Paragraph>
                <Paragraph style={styles.itemPrice}>Giá: {this._formatCurency(item.x_gia_ban)}</Paragraph>
                {/* <Paragraph >Đã bán: {item.x_tong_so_dh}</Paragraph> */}
                <Paragraph style={{fontSize:12}}>
                  {`Thời gian: ${this.state.days} ngày ${this.state.hours} : ${this.state.mins} : ${this.state.secs}`}
                </Paragraph>
              </View>            
          </Card.Content>
          </Card>
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
    container: {
      marginTop: 3,
      flex:1
    },
    content:{
      overflow: 'hidden',
      borderRadius: 3,
	    flex: 1,
      flexDirection: 'row',
      margin: -12,
      padding: 5
    },
    imageView:{
      borderRadius: 10,
      width:128,
      height:96,
    },
    detailView:{
      flex:1,
      height:96,
      marginLeft: 10
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000000',
      overflow: 'hidden',
    },
    itemPrice: {
      fontWeight: '700',
      color: 'red',
    },
    itemPriceClearance: {
      textDecorationLine: 'line-through',
    }
});