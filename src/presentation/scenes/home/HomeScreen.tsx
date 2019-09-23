import React, { Fragment, Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface HomeScreenProps {

}

export default class HomeScreen extends React.PureComponent<HomeScreenProps> {

    render() {
        return (<View style={styles.container}>
            <Text>Hello</Text>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },    
});