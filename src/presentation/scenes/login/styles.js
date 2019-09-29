import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const CommonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        flex: 0.25,
        backgroundColor: Colors.blue,
        width: 400,
        height: 400
    },
    form: {
        flex: 0.5,
        paddingTop: 20,
        paddingBottom: 20,
        paddingStart: 10,
        paddingEnd: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
    },
    textInput: {
        backgroundColor: Colors.white,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingStart: 10,
        paddingEnd: 10
    }
});

export default CommonStyles;
