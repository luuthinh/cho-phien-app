<<<<<<< HEAD
import React from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {useDispatch, connect} from 'react-redux';
import { login, clearLoginErrorMessage} from '../redux/actions';

class DangNhap extends React.Component {
    state = {
        username: '',
        password: '',
    };

    componentWillReceiveProps(nextProps): void {
        const {errorMessage} = this.props;
        if (nextProps.errorMessage !== errorMessage && nextProps.errorMessage !== ''){
            Alert.alert(
                nextProps.errorMessage,
                '',
                [{text:'ok', onPress:()=> this.props.clearLoginErrorMessage()}],
            );
        }
    }

    signInAsync = async() => {
        const {password, username} = this.state;
        await this.props.login(username,password);
    };

    render() {
        const {loggingIn} = this.props;
        const {username, password} = this.state;
        const isEnabledSubmit = (username.length >=4 && password.length >=5)

        return (
            <React.Fragment>
                <TextInput
                    autoCapitalize="none"
                    onChange={usr => this.setState({username:usr})}
                    label="Username"
                    value={username}
                />
                <TextInput
                    autoCapitalize="none"
                    onChange={pass => this.setState({password:pass})}
                    label="Password"
                    value={password}
                />
                <Button
                    disabled={!isEnabledSubmit}
                    onPress={this.signInAsync}
                    icon={loggingIn ? (<ActivityIndicator size="small" color="#ffffff"/>) : null}>Login
                </Button>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state){
    return {
        loggingIn: state.auth.loggingIn,
        errorMessage: state.auth.errorMessage,
    }
}

export default connect(mapStateToProps, {
    login,
    clearLoginErrorMessage,
})(DangNhap);
=======
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextInput } from 'react-native-paper';
import { ActivityIndicator, Alert } from 'react-native';
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
      <React.Fragment>
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
      </React.Fragment>
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
>>>>>>> e1e11d734a7d09d032f96bad971f3e7dc92ac437
