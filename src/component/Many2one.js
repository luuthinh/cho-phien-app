import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet, FlatList} from 'react-native';
import { Portal, Dialog, Text, Button, Checkbox, Searchbar, Paragraph} from 'react-native-paper';
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
            ],
            keyword: ''
        }
    }
    _cancelSelection = () => {
        let {data, preSelectedItem} = this.state;
        data.map(item =>{
            item.checked = false;
            if (item.id === preSelectedItem.id){
                item.checked = true
            }
        })
        this.setState({data, visible:false, keyword:'', selectedItem: preSelectedItem})
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
            .finally(() => {});    
    }
    componentDidUpdate(prevProps){
    }
    componentDidMount(){
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
                        "res.partner","name_search",["",[],"ilike",8]]
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
            .finally(() => {});          
    }
    showDialog = () => this.setState({'visible':true})

	_keyExtractor = idx => {
		return idx.id.toString();
    };
    
    _onItemSelected = (item) => {
        let selectedItem = [];
        let {data} = this.state;
        item.checked = !item.checked;
        for (let index in data){
            if (data[index].id === item.id){
                data[index] = item
            }
            else {
                data[index].checked = false
            }
            
        }
        if (item.checked) selectedItem=item
        this.setState({data, selectedItem})
    }

    _renderItem = (data,idx) => {
        return (
            <TouchableOpacity
                key={idx}
                onPress={() => this._onItemSelected(data.item)}
                activeOpacity={0.7}
                style={styles.itemWrapper}
            >
                <Text>{data.item.name}</Text>
                <Checkbox.Item
                    style={styles.itemIcon} 
                    status={data.item.checked ? 'checked':'unchecked'}
                />
            </TouchableOpacity>
        );
     };    

    render(){
        let {cancelButtonText,selectButtonText,onSelect} = this.props
        let { visible, selectedItem, preSelectedItem} = this.state
        return(
            <TouchableOpacity onPress={this.showDialog}>
                {
                    Object.keys(preSelectedItem).length
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
                            <Button 
                                onPress={this._cancelSelection}
                                mode='outlined'
                                style={styles.button}
                            >
                                {cancelButtonText}
                            </Button>
                            <Button 
                                onPress={()=>{
                                    onSelect && onSelect(selectedItem);
                                    this.setState({visible:false,keyword:'',preSelectedItem:selectedItem})
                                }}
                                mode='contained'
                                style={[styles.button,]}
                            >
                                <Text style={{color:'white'}}>{selectButtonText}</Text>
                            </Button>                            
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
    },
    title: {
        fontSize: 16, marginBottom: 16, width: '100%', textAlign: 'center'
    },
    line: {
        height: 1, width: '100%', backgroundColor: '#cacaca'
    },
    inputKeyword: {
        height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#cacaca',
        paddingLeft: 8, marginHorizontal: 24, marginTop: 16
    },
    buttonWrapper: {
        marginVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    },
    button: {
        height: 36, flex: 1
    },
    selectedTitlte: {
        fontSize: 14, color: 'gray', flex: 1
    },
    tagWrapper: {
        flexDirection: 'row', flexWrap: 'wrap'
    },
    listOption: {
        paddingHorizontal: 24,
        paddingTop: 1, marginTop: 16
    },
    itemWrapper: {
        borderBottomWidth: 1, borderBottomColor: '#eaeaea',
        paddingVertical: 12, flexDirection: 'row', alignItems: 'center'
    },
    itemText: {
        fontSize: 16, color: '#333', flex: 1
    },
    itemIcon: {
        width: 30, textAlign: 'right'
    },
    empty: {
        fontSize: 16, color: 'gray', alignSelf: 'center', textAlign: 'center', paddingTop: 16
    }    
})

Many2one.propsTypes = {
    model: PropsTypes.string.isRequired,
    uid: PropsTypes.number.isRequired,
    password: PropsTypes.string,
    db: PropsTypes.string,
    url: PropsTypes.string,
    title: PropsTypes.string,
    onSelect: PropsTypes.func
}