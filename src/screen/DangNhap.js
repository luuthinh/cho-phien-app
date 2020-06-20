import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextInput } from 'react-native-paper';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
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
    const isEnabledSubmit = (username.length >= 4 && password.length >= 5);

    return (
      <View style={styles.container}>
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
          disabled={!isEnabledSubmit}
          icon={loggingIn ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : null}
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