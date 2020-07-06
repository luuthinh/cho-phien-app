import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet, FlatList} from 'react-native';
import { Portal, Dialog, Text, Button, Paragraph} from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height

class Many2one extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            selectItem: null,
            data: [
                {id:1, name:"Thịnh"}
            ],
            keyword: ''
        }
    }
    componentDidUpdate(prevProps){

    }
    showDialog = () => this.setState({'visible':true})
    hideDialog = () => this.setState({'visible': false})

	_keyExtractor = item => {
		return item.id.toString();
	};
    _renderItem = data => {
        return (
            <Text>{data.item.name}</Text>
        );
     };    

    render(){
        return(
            <TouchableOpacity onPress={this.showDialog}>
                <Text>123</Text>
                <Button onPress={this.showDialog}>Show Dialog</Button>
                <Portal>
                    <Dialog
                        onDismiss={this.hideDialog}
                        style={styles.containerDialog} 
                        visible={this.state.visible}>
                        <Dialog.Title>Chọn khách hàng</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>THis is Dialog</Paragraph>
                        </Dialog.Content>
                        <Dialog.ScrollArea>
                        <FlatList
                            extraData={this.state}
                            data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                        </Dialog.ScrollArea>
                        <Dialog.Actions>
                            <Button onPress={this.hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </TouchableOpacity>

        )
    }
}

export default Many2one;

const styles = StyleSheet.create({
    containerDialog: {
        width: SCREEN_WIDTH - 60,
        height: SCREEN_HEIGHT - 140,
        marginTop: 70,
        marginLeft: 30
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})