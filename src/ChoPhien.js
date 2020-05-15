import React from 'react';
import { Text, View, FlatList, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import dot_mb from '../assets/dot_mb.json'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
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

// main
class ChoPhien extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  data: [],
		  isLoading: true
		};
	  }
	componentDidMount() {
		  	fetch('http://192.168.1.100:8069/dotmoban', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						jsonrpc: '2.0',
						params:{}
					})
					})
					.then((response) => response.json())
					.then((json) => {
					  this.setState({ data: json.result });
					})
					.catch((error) => console.error(error))
					.finally(() => {
					  this.setState({ isLoading: false });
					});
	  }
	_keyExtractor = item => {
		return item.id;
	};

  _renderItem = data => {
	  var item = data.item
    return (
      <View style={styles.item}>
        <Card>
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          <Card.Content>
            <Title>{item.bsd_ten_dmb}</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/300' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  _getItemLayout = (data, index) => {
    const productHeight = PRODUCT_ITEM_HEIGHT + PRODUCT_ITEM_MARGIN;
    return {
      length: productHeight,
      offset: productHeight * index,
      index,
    };
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }  
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          getItemLayout={this._getItemLayout}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

export default ChoPhien;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
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
    backgroundColor: 'green',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  itemImage: {
    width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
      PRODUCT_ITEM_MARGIN,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    flex: 1,
    ...Platform.select({
      ios: {
        fontWeight: '400',
      },
    }),
    margin: PRODUCT_ITEM_OFFSET * 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: PRODUCT_ITEM_OFFSET * 2,
    borderWidth: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.15)',
    margin: PRODUCT_ITEM_OFFSET * 2,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  itemPriceClearance: {
    fontWeight: 'bold',
    color: 'red',
  },
});