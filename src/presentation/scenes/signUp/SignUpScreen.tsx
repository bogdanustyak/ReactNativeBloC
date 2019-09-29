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
import { Resource } from '../../Resource';
import { User } from '../../../data/entities/EUser';
import MkAuthService from '../../../data/mock/MkAuthService';
import SignUpBloc from './SignUpBloc';
import SimpleSignUpUseCase from '../../../domain/SimpleSignUpUseCase';

export interface SignUpProps {
    navigation: any;
    resourceValue: Resource<User>;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

interface State {
    resourceValue: Resource<User>;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

export default class SignUpScreen extends React.PureComponent<
    SignUpProps,
    State
> {
    signUpBloc: SignUpBloc = new SignUpBloc(
        new SimpleSignUpUseCase(new MkAuthService())
    );

    constructor(props: Readonly<SignUpProps>) {
        super(props);
        this.state = {
            resourceValue: this.signUpBloc.initialState,
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        };
        this.form = this.form.bind(this);
        this.signUpButton = this.signUpButton.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.signUpBloc.subject.subscribe({
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
    componentWillUnmount(){
        this.signUpBloc.dispose();
    }

    form() {
        const { email, password, resourceValue } = this.state;
        const { navigation } = this.props;
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
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.setState({ password: text })}
                    placeholder="Confirm Password"
                    value={password}
                />
                <Button
                    title="Already have an account? Login."
                    onPress={() => navigation.navigate('Login')}
                />
                {resourceValue.isLoading() ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    this.signUpButton()
                )}
            </View>
        );
    }

    signUpButton() {
        const { email, firstName, lastName, password } = this.state;
        return (
            <Button
                title="Signup"
                onPress={() =>
                    this.signUpBloc.singUp(email, firstName, lastName, password)
                }
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
