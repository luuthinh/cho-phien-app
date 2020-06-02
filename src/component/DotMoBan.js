import React from 'react';
import { Text, View,StyleSheet,Dimensions } from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import * as Progress from 'react-native-progress';
import moment from 'moment';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;
// item size
const PRODUCT_ITEM_HEIGHT = 305;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

export default class DotMoBan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      eventDate1:moment.duration().add({days:1,hours:3,minutes:40,seconds:50}),
      eventDate:moment.duration(moment(this.props.data.item.bsd_den_ngay).diff(moment())),
      days:0,
      hours:0,
      mins:0,
      secs:0
    }
  }
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ'
    return money
  }
  updateTimer=()=>{
    const x = setInterval(()=>{
      let { eventDate} = this.state

      if(eventDate <=0){
        clearInterval(x)
      }else {
        eventDate = eventDate.subtract(1,"s")
        const days = eventDate.days()
        const hours = eventDate.hours()
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()
        
        this.setState({
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
    console.log(this.state.eventDate1)
    return (
        <View style={styles.item}>
        <Card onPress={() => {return this.props.navigation.push('Đặt hàng',item)}}> 
          <Card.Cover style={styles.itemImage} source={{uri: `data:image/jpeg;base64,${item.bsd_image_512}}`}}/>
          <Paragraph style={styles.itemTitle}>{item.bsd_product_id[1]}</Paragraph>
        	<Paragraph style={styles.itemPrice}>Giá hiện tại: {this._formatCurency(100000)}</Paragraph>
          <Paragraph style={styles.itemPriceClearance}>Giá khởi điểm: {this._formatCurency(150000)}</Paragraph>
		      <Progress.Bar progress={0.6} color='red' height={19} backgroundColor='gray'>
			      <Text style={{alignSelf:"center",color:'white',position:"absolute",top:0.5}}>
              {`${this.state.days} ngày ${this.state.hours} : ${this.state.mins} : ${this.state.secs}`}
            </Text>
          </Progress.Bar>
          <Text></Text>
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