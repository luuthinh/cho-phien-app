import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet, FlatList} from 'react-native';
import { Portal, Dialog, Text, Button, Divider, Searchbar, Paragraph} from 'react-native-paper';
import PropsTypes from 'prop-types';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height
const INIT_HEIGHT = height * 0.6;

class Many2one extends React.Component {
    static defaultProps = {
        cancelButtonText: 'Hủy',
        selectButtonText: 'Chọn',
        searchPlaceHolderText: "Nhập vào từ khóa",
        listEmptyTitle: "Không tìm thấy lựa chọn phù hợp",
    }
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            preSelectedItem: {},
            selectedItem: {},
            data: [
                {id:1, name:"Thịnh"}
            ],
            keyword: ''
        }
    }
    cancelSelection = () => {

    }
    _onchangeSearch = (keyword) => {
        this.setState({keyword: keyword})
        fetch(this.props.url, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                params:{
                "service":"object",
                "method":"execute_kw",
                "args":[this.props.db,
                        this.props.uid,this.props.password,
                        "res.partner","name_search",[keyword]]
                }
            })
            })
            .then((response) => response.json())
            .then((json) => {
                let mockData = []
                json.result.map((data) => {
                mockData.push({id:data[0],name:data[1]})
                })
                this.setState({data:mockData})
            })
            .catch((error) => console.error(error))
            .finally(() => { console.log("load xong")
            });    
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
        let {cancelButtonText,selectButtonText} = this.props
        let { visible, selectedItem, preSelectedItem} = this.state
        return(
            <TouchableOpacity onPress={this.showDialog}>
                {
                    preSelectedItem.length > 0 
                        ? (
                            <View>
                                <Text>{preSelectedItem.name}</Text>
                           </View>)
                        : <Text>Chọn khách hàng</Text>
                }
                <Portal>
                    <Dialog
                        onDismiss={this.hideDialog}
                        style={styles.containerDialog} 
                        visible={this.state.visible}>
                        <Dialog.Content style={{marginTop:-20}}>
                            <Paragraph>Chọn khách hàng</Paragraph>
                            <Searchbar 
                                onChangeText={this._onchangeSearch}
                                value={this.state.keyword}
                            />
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
                            <Button onPress={this.hideDialog}>{selectButtonText}</Button>
                            <Button onPress={this.hideDialog}>{cancelButtonText}</Button>
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
        paddingTop: 0,
        backgroundColor: '#fff', 
        borderTopLeftRadius: 8, 
        borderTopRightRadius: 8,
        height: INIT_HEIGHT,
    }
})

Many2one.propsTypes = {
    model: PropsTypes.string.isRequired,
    uid: PropsTypes.number.isRequired,
    password: PropsTypes.string,
    db: PropsTypes.string,
    url: PropsTypes.string,
    title: PropsTypes.string,
}