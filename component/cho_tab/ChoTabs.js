import React, {Component} from 'react';
import {FlatList,ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator()

class ChoTabs extends Component {
    render() {
        return(
            <Stack.Navigator>
                <Stack.Screen name="Chợ" component={DotMoBan} 
                    options={{title:'Chợ',
                              headerStyle:{
                                backgroundColor:"#f4511e",
                              },
                              headerTintColor:'#fff',
                              headerTitleStyle: {
                                fontWeight: 'bold',
                              },
                            }}/>
            </Stack.Navigator>
        )
    }
}
export default ChoTabs

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:20
    }
}) 
class DotMoBan extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
        }
    }
    componentDidMount(){
        return fetch('http://192.168.1.100:8069/jsonrpc',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                "jsonrpc":"2.0",
                "method":"call",
                "id": 100,
                "params":{
                    "service":"object",
                    "method":"execute_kw",
                    "args":["odoo_db",2,"admin","res.partner","search_read",[[]],{"fields":["name","country_id","comment"]}]
                }
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson.result,
                    },
                    function(){}
                );
            })
            .catch(error => {
                console.error(error)
            });
    }
    render() {
        if (this.state.isLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>                
            )
        }
        return(
            <View style={styles.container}>
                <FlatList data={this.state.dataSource} renderItem={({item}) =>(
                    <Text>{item.id}, {item.name}</Text>
                )} keyExtractor={({id},index) =>id}/>
            </View>
        )
    }
}

