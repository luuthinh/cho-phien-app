import React from 'react';
import { Text, View } from 'react-native';
import {Card, Paragraph} from 'react-native-paper';

export default class DatHang extends React.Component {
  constructor(props){
    super(props)
  }
  _formatCurency = (money) => {
    money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + 'đ';
    return money;
  }
  render() {
    console.log(this.props.route.params)
    var item = this.props.route.params
    return (
      <Card>
      <Card.Cover source={{uri: `data:image/jpeg;base64,${item.bsd_image_512}}`}}/>
        <Card.Title title="Abandoned Ship" />
        <Card.Content>
          <Paragraph>
            {item.bsd_product_id[1]}
            {this._formatCurency(100000)}
          </Paragraph>
        </Card.Content>
      </Card>
    );
  }
}