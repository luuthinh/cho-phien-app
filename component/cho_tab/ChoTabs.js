import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class ChoTabs extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Chợ nè bà con</Text>
            </View>
        )
    }
}
export default ChoTabs

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}) 

