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