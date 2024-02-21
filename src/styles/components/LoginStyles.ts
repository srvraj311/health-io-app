import { StyleSheet } from "react-native";
import GlobalStyles from "../general/global_styles";

export const loginStyles = StyleSheet.create({
    keyboardViewContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: GlobalStyles.pagBackground,
        alignItems: 'center'
    },
    containerIos: {
        flex: 1,
        paddingTop: 122,
        backgroundColor: GlobalStyles.pagBackground,
        alignItems: 'center',
        fontFamily: GlobalStyles.baseFont,
    },
    containerAndoroid: {
        flex: 1,
        backgroundColor: GlobalStyles.pagBackground,
        alignItems: 'center',
        fontFamily: GlobalStyles.baseFont,
        paddingTop: 70,
    },
    image: {
        height: 125,
        width: 141,
        resizeMode: 'cover',
    },
    subHeader: {
        fontFamily: GlobalStyles.baseFont,
        fontSize: 16,
        marginTop: 16,
        color: GlobalStyles.grey500
    },
    input: {
        width: 345,
        height: 56,
        marginTop: 32,
        borderWidth: 1,
        borderColor: GlobalStyles.grey300,
        padding: 10,
        borderRadius: 5,
        backgroundColor: GlobalStyles.grey100,
        fontFamily: GlobalStyles.baseFont,
        fontSize: 16,
        color: GlobalStyles.grey700
    },
    bgImage: {
        resizeMode: 'cover',
        width: '100%',
        height: 270,
        position: 'absolute',
        bottom: 0,
        zIndex: -1
    },
    bgImageAndroid: {
        resizeMode: 'cover',
        width: '100%',
        height: 270,
        position: 'absolute',
        bottom: 0,
        zIndex: -1
    }
})