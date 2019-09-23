import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    TextInput,
    Button,
    ActivityIndicator,
    Alert,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { LoginBloc } from './LoginBloc';
import { Resource, ResourceState } from '../../Resource';
import { User } from '../../../data/entities/EUser';
import SimpleLoginUseCase from '../../../domain/SimpleLoginUseCase';
import MkAuthService from '../../../data/mock/MkAuthService';

interface LoginProps {
    navigation: any,
    resourceValue: Resource<User>;
    email: string;
    password: string;
}

export default class LoginScreen extends React.PureComponent<LoginProps> {

    loginBloc: LoginBloc = new LoginBloc(
        new SimpleLoginUseCase(
            new MkAuthService()
        )
    );

    state = {
        resourceValue: this.loginBloc.initialState,
        email: "email@gmail.com",
        password: "password"
    };

    constructor(props: Readonly<LoginProps>) {
        super(props);
        this.form = this.form.bind(this);
        this.loadingView = this.loadingView.bind(this);
        this.loginButton = this.loginButton.bind(this);
    }

    componentDidMount() {
        this.loginBloc.subject.subscribe({
            next: (value) => {
                switch (value.state) {
                    case ResourceState.SUCCESS: {
                        this.props.navigation.navigate('Home');
                        break;
                    }
                    case ResourceState.FAILURE: {
                        Alert.alert(
                            'Error',
                            value.message,
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false },
                        );
                        break;
                    }
                }
                this.setState(
                    { resourceValue: value }
                )
            }
        })
    }

    render() {
        return <Fragment>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic">
                    {this.form()}
                </ScrollView>
            </SafeAreaView>
        </Fragment>;
    }

    form() {
        return <View style={styles.form}>
            <TextInput
                style={styles.textInput}
                onChangeText={text => this.setState({ email: text })}
                placeholder={"Email"}
                value={this.state.email}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={text => this.setState({ password: text })}
                placeholder={"Password"}
                value={this.state.password}
            />
            {this.state.resourceValue.state == ResourceState.LOADING ? this.loadingView() : this.loginButton()}
        </View>;
    }

    loadingView() {
        return <View>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>;
    }

    loginButton() {
        return <Button
            title="Login"
            onPress={() => this.loginBloc.login(
                this.state.email,
                this.state.password
            )}
        />;
    }
}

const styles = StyleSheet.create({
    form: {
        padding: 40,
        flexDirection: "column",
        justifyContent: 'space-between',
        flex: 1,
    },
    textInput: {
        backgroundColor: Colors.white,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingStart: 10,
        paddingEnd: 10,
    },
});
