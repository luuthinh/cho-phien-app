import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet, FlatList} from 'react-native';
import { Portal, Dialog, Text, Button} from 'react-native-paper';
import PropsTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height
const INIT_HEIGHT = height * 0.6;

class Selection extends React.Component {
    static defaultProps = {
        cancelButtonText: 'Hủy',
        selectButtonText: 'Chọn',
        colorTheme: '#16a45f',
        placeholder: {label:'Tùy chọn...',value:1},
        listEmptyTitle: "Không tìm thấy lựa chọn phù hợp",
    }
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            preSelectedItem: {},
            selectedItem: {},
            data: [],
        }
    }
    _cancelSelection = () => {
        let {data, preSelectedItem} = this.state;
        data.map(item =>{
            item.checked = false;
            if (item.value === preSelectedItem.value){
                item.checked = true
            }
        })
        this.setState({data, visible:false, selectedItem: preSelectedItem})
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({data:newProps.items})
    }
    showDialog = () => this.setState({'visible':true})
	_keyExtractor = idx => {
		return idx.value.toString();
    };
    _onItemSelected = (item) => {
        let selectedItem = [];
        let {data} = this.state;
        item.checked = !item.checked;
        for (let index in data){
            if (data[index].value === item.value){
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
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>Người nhận: {data.item.name}</Text>
                    <Text style={styles.itemText}>Số ĐT: {data.item.moblie}</Text>
                    <Text style={styles.itemText}>{data.item.label}</Text>
                </View>
                <Icon
                    style={styles.itemIcon} 
                    name={data.item.checked ? 'check-circle-outline' : 'radiobox-blank'}
                    color={data.item.checked ? this.props.colorTheme : '#777777'} size={20}
                />
            </TouchableOpacity>
        );
     };    

    render(){
        let {cancelButtonText,selectButtonText,onSelect,placeholder,label,items} = this.props
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
                                <Text>Người nhận: {preSelectedItem.name}</Text>
                                <Text>Số ĐT: {preSelectedItem.mobile}</Text>  
                                <Text>{preSelectedItem.label}</Text>
                           </View>)
                        : (
                            <View>
                                <Text>{placeholder.label}</Text>
                           </View>)
                }
                <Portal>
                    <Dialog
                        onDismiss={this.hideDialog}
                        style={styles.containerDialog} 
                        visible={this.state.visible}>
                        <Dialog.ScrollArea>
                            <FlatList
                                extraData={this.state}
                                data={items}
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
                                    this.setState({visible:false,preSelectedItem:selectedItem})
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

Selection.PropsType = {
    onSelect: PropsTypes.func,
    placeholder: PropsTypes.object,
    disabled: PropsTypes.bool,
    items: PropsTypes.array,
    label: PropsTypes.string,
    popupLabel: PropsTypes.string

}

export default Selection;

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
        borderBottomWidth: 1, borderBottomColor: '#eaeaea', flex:1,
        paddingVertical: 12, flexDirection: 'row', alignItems:'center',
    },
    itemView: {
        fontSize: 16, flex:2,
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
