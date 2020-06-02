import React from 'react';
import { Text, View,StyleSheet,Dimensions } from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import * as Progress from 'react-native-progress';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';

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
      totalDuration: '',
    };
  }
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ'
    return money
  }

  componentDidMount() {
    var that = this;

    //We are showing the coundown timer for a given expiry date-time
    //If you are making an quize type app then you need to make a simple timer
    //which can be done by using the simple like given below
    //that.setState({ totalDuration: 30 }); //which is 30 sec

    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss');
    //Getting the current date-time with required formate and UTC   
    
    var expirydate = '2020-10-23 04:00:45';//You can set your own date-time
    //Let suppose we have to show the countdown for above date-time 

    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    //difference of the expiry date-time given and current date-time

    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    //converting in seconds

    that.setState({ totalDuration: d });
    //Settign up the duration of countdown in seconds to re-render
  }  

  render() {
    const item = this.props.data.item
    return (
        <View style={styles.item}>
        <Card onPress={() => {return this.props.navigation.push('Đặt hàng',item)}}> 
          <Card.Cover style={styles.itemImage} source={{uri: `data:image/jpeg;base64,${item.bsd_image_512}}`}}/>
          <Paragraph style={styles.itemTitle}>{item.bsd_product_id[1]}</Paragraph>
        	<Paragraph style={styles.itemPrice}>Giá hiện tại: {this._formatCurency(100000)}</Paragraph>
          <Paragraph style={styles.itemPriceClearance}>Giá khởi điểm: {this._formatCurency(150000)}</Paragraph>
		      <Progress.Bar progress={0.9} color='red' height={19} backgroundColor='gray'>
			      <Text style={{alignSelf:"center",color:'white',position:"absolute",top:0.5}}>selected week 8</Text>
          </Progress.Bar>
          <CountDown
          style={{}}
          until={this.state.totalDuration}
          //duration of countdown in seconds
          timetoShow={('M', 'S')}
          //formate to show
          onFinish={() => alert('finished')}
          //on Finish call
          onPress={() => alert('hello')}
          //on Press call
          size={10}
          timeLabels={{d:null,h:null,m:null,s:null}}
          digitStyle={{backgroundColor:'transparent'}}
          separatorStyle={{color: '#000'}}
          showSeparator
        />
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