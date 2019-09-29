import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StatusBar,
    TextInput,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import styles from './styles';
import {LoginBloc} from './LoginBloc';
import {Resource} from '../../Resource';
import {User} from '../../../data/entities/EUser';
import SimpleLoginUseCase from '../../../domain/SimpleLoginUseCase';
import MkAuthService from '../../../data/mock/MkAuthService';
import KeyboardAwareView, {KeyboardAwareProps} from "../../KeyboardAwareView";

export interface LoginProps extends KeyboardAwareProps {
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

const KeyboardAwareImage = KeyboardAwareView(View);
const KeyboardAwareFragment = KeyboardAwareView(View);

export default class LoginScreen extends React.PureComponent<LoginProps,
    State> {
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
        this.logo = this.logo.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.loginBloc.subject.subscribe({
            next: (value: Resource<User>) => {
                if (value.isSuccessful()) {
                    navigation.navigate('Home');
                }
                if (value.isFailure()) {
                    Alert.alert(
                        'Error',
                        value.resMessage,
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                }
                            }
                        ],
                        {cancelable: false}
                    );
                }
                this.setState({resourceValue: value});
            }
        });
    }

    form() {
        const {email, password, resourceValue} = this.state;
        const {navigation} = this.props;
        return (
            <View style={styles.form}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.setState({email: text})}
                    placeholder="Email"
                    value={email}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.setState({password: text})}
                    placeholder="Password"
                    value={password}
                />
                <Button
                    title="Sign Up"
                    onPress={() => navigation.navigate('SignUp')}
                />
                {resourceValue.isLoading() ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    this.loginButton()
                )}
            </View>
        );
    }

    loginButton() {
        const {email, password} = this.state;
        return (
            <Button
                title="Login"
                onPress={() => this.loginBloc.login(email, password)}
            />
        );
    }

    logo() {
        return <KeyboardAwareImage
            noAnimation={false}
            hideOnKeyboard={false}
            styleDuringKeyboardShow={
                {
                    height: 20,
                    width: 20,
                    padding: 50,
                    opacity: 0.5,
                }
            }
        >
            <Image
                style={styles.logo}
                source={{
                    uri: 'data:image/jpeg;base64,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'
                }}
            />
        </KeyboardAwareImage>;
    }

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView>
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        <KeyboardAwareFragment
                            style={{
                                flex: 1,
                                marginBottom: 40
                            }}
                            noAnimation={false}
                            hideOnKeyboard={false}
                            styleDuringKeyboardShow={{
                                marginBottom: 500,
                                marginStart: 10,
                                marginEnd: 10
                            }}>
                            <View>
                                {this.logo()}
                                {this.form()}
                            </View>
                        </KeyboardAwareFragment>
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}
