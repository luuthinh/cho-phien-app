import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


class LoaLoaTab extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Loa Loa tôi nói bà con có nghe thấy không </Text>
            </View>
        );
    }
}
export default LoaLoaTab

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})