import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CommonStyles = StyleSheet.create({
    form: {
        padding: 40,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
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
