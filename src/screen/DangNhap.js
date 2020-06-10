import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextInput } from 'react-native-paper';
import { ActivityIndicator, Alert } from 'react-native';
import { clearLoginErrorMessage, login } from '../redux/actions';

class Dangnhap extends Component {
  state = {
    username: '',
    password: '',
  };

  componentWillReceiveProps(nextProps): void {
    const { errorMessage } = this.props;
    if (nextProps.errorMessage !== errorMessage && nextProps.errorMessage !== '') {
      Alert.alert(
        nextProps.errorMessage,
        '',
        [{ text: 'OK', onPress: () => this.props.clearLoginErrorMessage() }],
      );
    }
  }

  signInAsync = async () => {
    const { password, username } = this.state;
    await this.props.login(username, password);
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