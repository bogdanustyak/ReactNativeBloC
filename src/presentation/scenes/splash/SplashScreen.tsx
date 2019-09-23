import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface Props {
    navigation: any
}

export default class SplashScreen extends React.PureComponent<Props> {

    constructor(props: Readonly<Props>){
        super(props);
        this.openLoginScreen = this.openLoginScreen.bind(this);
    }
    
    render() {
        return <View style={styles.container}>
            <Text>Hello app</Text>
            <Button
                title="Login"
                onPress={() => this.openLoginScreen()}
            />
        </View>;
    }

    openLoginScreen() {        
        console.log("Got click");
        this.props.navigation.navigate('Login');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
