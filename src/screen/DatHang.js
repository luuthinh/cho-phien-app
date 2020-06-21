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
          <Card.Cover source={{uri: `https://vuonnhatoi.odoo.com/web/content/x_dot_mb/${item.id}/x_image_512`,
                               method: "GET",
                               headers: {
                                 "Content-Type": "application/x-www-form-urlencoded",
                                 "X_Openerp": "e962ad24d1f1a6caaa094c30351d7f73d78476cc"
                               }
                      }}
          />
        <Card.Title title="Abandoned Ship" />
        <Card.Content>
          <Paragraph>
            {item.x_product_id[1]}
            {this._formatCurency(100000)}
          </Paragraph>
        </Card.Content>
      </Card>
    );
  }
}