import React, { Component } from 'react';
import {
    EmitterSubscription,
    Keyboard,
    LayoutAnimation,
    Platform,
    View
} from 'react-native';

export interface KeyboardAwareProps {
    noAnimation: boolean;
    styleDuringKeyboardShow: any;
    style?: any;
    hideOnKeyboard: boolean;
}

export default (HigherComponent: React.ComponentClass<any>) => {
    return class KeyboardAware extends Component<KeyboardAwareProps, any> {
        state = { keyboardOn: false };
        keyboardWillShowSub!: EmitterSubscription;
        keyboardWillHideSub!: EmitterSubscription;

        componentDidMount() {
            this.keyboardWillShowSub = Keyboard.addListener(
                Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
                event => {
                    this.setState({ keyboardOn: true });
                }
            );
            this.keyboardWillHideSub = Keyboard.addListener(
                Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
                event => {
                    this.setState({ keyboardOn: false });
                }
            );
        }

        componentDidUpdate() {
            !this.props.noAnimation && LayoutAnimation.easeInEaseOut();
        }

        componentWillUnmount() {
            this.keyboardWillShowSub && this.keyboardWillShowSub.remove();
            this.keyboardWillHideSub && this.keyboardWillHideSub.remove();
        }

        render() {
            const {
                styleDuringKeyboardShow,
                style,
                children,
                hideOnKeyboard,
                ...props
            } = this.props;
            if (this.state.keyboardOn && hideOnKeyboard) return null;
            return (
                <View>
                    <HigherComponent
                        style={[
                            style,
                            this.state.keyboardOn && styleDuringKeyboardShow
                        ]}
                        {...props}
                    >
                        {children}
                    </HigherComponent>
                </View>
            );
        }
    };
};
