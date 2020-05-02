import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


class CaNhanTab extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Thông tin cá nhân của tôi</Text>
            </View>
        );
    }
}
export default CaNhanTab

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})