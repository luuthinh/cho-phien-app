import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet, FlatList} from 'react-native';
import { Portal, Dialog, Text, Button, Checkbox, Searchbar, Paragraph} from 'react-native-paper';
import PropsTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height
const INIT_HEIGHT = height * 0.6;

class Many2one extends React.Component {
    static defaultProps = {
        cancelButtonText: 'Hủy',
        selectButtonText: 'Chọn',
        colorTheme: '#16a45f',
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
                <Text style={styles.itemText}>{data.item.name}</Text>
                <Icon
                    style={styles.itemIcon} 
                    name={data.item.checked ? 'check-circle-outline' : 'radiobox-blank'}
                    color={data.item.checked ? this.props.colorTheme : '#777777'} size={20}
                />
            </TouchableOpacity>
        );
     };    

    render(){
        let {cancelButtonText,selectButtonText,onSelect,label,placeholder} = this.props
        let { selectedItem, preSelectedItem} = this.state
        return(
            <View>
                <Text style={styles.label}>{label}</Text>
            <TouchableOpacity 
                style={styles.container}
                onPress={this.showDialog}>
                {
                    Object.keys(preSelectedItem).length
                        ? (
                            <View>  
                                <Text>{preSelectedItem.name}</Text>
                           </View>)
                        : (
                            <View>
                                <Text>{placeholder}</Text>
                           </View>)
                }
                <Portal>
                    <Dialog
                        onDismiss={this.hideDialog}
                        style={styles.containerDialog} 
                        visible={this.state.visible}>
                        <Dialog.Content style={{marginTop:-15}}>
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
            </View>
        )
    }
}

Many2one.propsTypes = {
    model: PropsTypes.string.isRequired,
    uid: PropsTypes.number.isRequired,
    password: PropsTypes.string,
    db: PropsTypes.string,
    url: PropsTypes.string,
    placeholder: PropsTypes.string,
    onSelect: PropsTypes.func,
    label: PropsTypes.string.isRequired,
    domain: PropsTypes.array
}

export default Many2one;

const styles = StyleSheet.create({
    container: {
        width: '100%', minHeight: 45, borderRadius: 2, paddingHorizontal: 16,
        flexDirection: 'row', alignItems: 'center', borderWidth: 1,
        borderColor: '#cacaca', paddingVertical: 4
    },
    containerDialog: {
        paddingTop: 0,
        backgroundColor: '#fff', 
        borderTopLeftRadius: 8, 
        borderTopRightRadius: 8,
        height: INIT_HEIGHT,
    },
    line: {
        height: 1, width: '100%', backgroundColor: '#cacaca'
    },
    button: {
        height: 36, flex: 1
    },
    itemWrapper: {
        borderBottomWidth: 1, borderBottomColor: '#eaeaea',
        paddingVertical: 12, flexDirection: 'row', alignItems:'center',
        height: 40
    },
    itemText: {
        fontSize: 16, flex:1,
    },
    itemIcon: {
        width: 30, textAlign: 'right'
    },
    label:{
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 5,
    }    
})
