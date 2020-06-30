import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,TextInput} from 'react-native-paper';
import {Keyboard, Text, View, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, StyleSheet} from 'react-native';
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
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>FUFA</Text>
            <TextInput
              autoCapitalize="none" 
              label="Email" 
              style={styles.loginFormTextInput}
              onChangeText={usr => this.setState({ username: usr })}
              value={username} />
            <TextInput 
              autoCapitalize="none"
              label="Password" 
              style={styles.loginFormTextInput}
              onChangeText={pass => this.setState({ password: pass })} 
              secureTextEntry={true}/>
            <Button
              style={styles.loginButton}
              loading = {loggingIn}
              mode="contained"
              onPress={this.signInAsync}
            >Đăng nhập</Button>
            <Button
              style={styles.fbLoginButton}
              onPress={() => this.onFbLoginPress()}
            >Facebook</Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  containerView: {
    flex: 1,
    
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 100,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 60,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
})
