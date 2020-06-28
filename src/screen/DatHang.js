import React from 'react';
import { Text, View, Dimensions, StyleSheet, Image, Alert} from 'react-native';
import {Paragraph, IconButton, Colors, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {URL_IMAGE} from '../constants/API';
import Select2 from '../component/Select-Two/index';

const {width} = Dimensions.get('window')
const SCREEN_WIDTH = parseInt(width)
const IMAGE_HEIGHT = parseInt(SCREEN_WIDTH / 1.2)

class DatHang extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      soLuong : 1,
      tamTinh : this.props.route.params.x_gia_hien_tai,
      mockData: [
        { id: 1, name: "React Native Developer", checked: true }, // set default checked for render option item
        { id: 2, name: "Android Developer" },
        { id: 3, name: "iOS Developer" }
      ],
      partner: {}, 
    }
  }
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ';
    return money;
  }
  _order = () => {
    Alert.alert("đặt hàng")
  }
  render() {
    var item = this.props.route.params
    return (
      <View>
        <Image source={{uri: `${URL_IMAGE}/x_dot_mb/${item.id}/x_image_512`,
                                method: "GET",
                                headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "X_Openerp": this.props.sessionID,
                                }
                      }}
                style={styles.imageView}
        />
        <View style={styles.detailView}>
          <View>
            <Paragraph style={styles.itemTitle}>{item.x_product_id[1]} - Giá: {this._formatCurency(item.x_gia_hien_tai)}</Paragraph>
          </View>
          <View style={styles.containerOrder}>
            <IconButton icon="minus" 
                        color={Colors.blueA700} 
                        size={20} 
                        onPress={()=> this.setState({soLuong:this.state.soLuong -1, tamTinh:(this.state.soLuong -1)*item.x_gia_hien_tai})}/>
            <Text style={{fontSize:20}}>{this.state.soLuong} {item.x_uom_id[1]}</Text>
            <IconButton icon="plus" color={Colors.blueA700} size={20} onPress={()=> this.setState({soLuong:this.state.soLuong +1, tamTinh:(this.state.soLuong +1)*item.x_gia_hien_tai})}/>
          </View>
          <View>
            <Paragraph style={styles.totalprice}>Tạm tính: {this._formatCurency(this.state.tamTinh)}</Paragraph>
            <Select2
              isSelectSingle
              style={{ borderRadius: 5 }}
              colorTheme="blue"
              popupTitle="Chọn khách hàng"
              title="Chọn khách hàng"
              data={this.state.mockData}
              onSelect={partner => {
                this.setState({ partner })
              }}
              onRemoveItem={partner => {
                this.setState({ partner })
              }}
            />
            <Button mode="contained" 
                    onPress={this._order}>Đặt hàng</Button>
          </View>
        </View>
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

export default connect(mapStateToProps)(DatHang);

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
  },
  imageView:{
    margin: 5,
    borderRadius:10,
    width:SCREEN_WIDTH -10,
    height:IMAGE_HEIGHT,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailView:{
    marginTop:10,
  },
  itemTitle: {
  fontSize: 20,
  overflow: 'hidden',
  },
  containerOrder:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  totalprice:{
    fontSize: 20,
    padding: 5,
  }
});