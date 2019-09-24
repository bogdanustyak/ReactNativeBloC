import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    StatusBar,
    TextInput,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import styles from './styles';
import { LoginBloc } from './LoginBloc';
import { Resource } from '../../Resource';
import { User } from '../../../data/entities/EUser';
import SimpleLoginUseCase from '../../../domain/SimpleLoginUseCase';
import MkAuthService from '../../../data/mock/MkAuthService';

export interface LoginProps {
    navigation: any;
    resourceValue: Resource<User>;
    email: string;
    password: string;
}

interface State {
    resourceValue: Resource<User>;
    email: string;
    password: string;
}

export default class LoginScreen extends React.PureComponent<
    LoginProps,
    State
> {
    loginBloc: LoginBloc = new LoginBloc(
        new SimpleLoginUseCase(new MkAuthService())
    );

    constructor(props: Readonly<LoginProps>) {
        super(props);
        this.state = {
            resourceValue: this.loginBloc.initialState,
            email: 'email@gmail.com',
            password: 'password'
        };
        this.form = this.form.bind(this);
        this.loginButton = this.loginButton.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.loginBloc.subject.subscribe({
            next: (value: Resource<User>) => {
                if (value.isSuccesfull()) {
                    navigation.navigate('Home');
                }
                if (value.isFailure()) {
                    Alert.alert(
                        'Error',
                        value.resMessage,
                        [
                            {
                                text: 'OK',
                                onPress: () => {}
                            }
                        ],
                        { cancelable: false }
                    );
                }
                this.setState({ resourceValue: value });
            }
        });
    }

    form() {
        const { email, password, resourceValue } = this.state;
        return (
            <View style={styles.form}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder="Email"
                    value={email}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.setState({ password: text })}
                    placeholder="Password"
                    value={password}
                />
                {resourceValue.isLoading() ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    this.loginButton()
                )}
            </View>
        );
    }

    loginButton() {
        const { email, password } = this.state;
        return (
            <Button
                title="Login"
                onPress={() => this.loginBloc.login(email, password)}
            />
        );
    }

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        {this.form()}
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}
