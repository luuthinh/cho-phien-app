import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextInput, Appbar, ActivityIndicator } from 'react-native-paper';
import {  Alert, StyleSheet, View } from 'react-native';
import { clearLoginErrorMessage, login } from '../redux/actions';

class Dangnhap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };    
  }
  
  componentDidUpdate(prevtProps) {
    const { errorMessage } = prevtProps;
    if (this.props.errorMessage !== errorMessage && this.props.errorMessage !== '') {
      Alert.alert(
        this.props.errorMessage,
        '',
        [{ text: 'OK', onPress: () => this.props.clearLoginErrorMessage() }],
      );
    }
  }

  signInAsync = async() => {
    const { password, username } = this.state;
    await this.props.login(this.props.navigation,username, password)
  };

  render() {
    const { loggingIn } = this.props;
    const { username, password } = this.state;

    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Đăng nhập / Đăng ký"/>
        </Appbar.Header>
        <View style={styles.center}>
        <TextInput
          autoCapitalize="none"
          placeholder="Username"
          onChangeText={usr => this.setState({ username: usr })}
          value={username}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={pass => this.setState({ password: pass })}
          secureTextEntry
        />
        <Button
          loading = {loggingIn}
          mode="contained"
          onPress={this.signInAsync}
        >Đăng nhập</Button>         
      </View>
      </View>

    );
  }
}


function mapStateToProps(state) {
  return {
    loggingIn: state.auth.loggingIn,
    errorMessage: state.auth.errorMessage,
  };
}

export default connect(mapStateToProps, {
  login,
  clearLoginErrorMessage,
})(Dangnhap);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    justifyContent: 'center',
  }
})
