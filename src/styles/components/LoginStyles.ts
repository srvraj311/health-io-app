import { StyleSheet } from "react-native";
import GlobalStyles from "../general/global_styles";

export const loginStyles = StyleSheet.create({
    scrollView: {
        maxHeight: 1080,
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: GlobalStyles.pagBackground,
        height: 'auto'
    },
    keyboardViewContainer: {
        flex: 1,
        alignItems: 'center',
        fontFamily: GlobalStyles.baseFont,
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        width: '100%',
        height: 'auto'
    },
    containerIos: {
        paddingTop: 102,
    },
    containerAndoroid: {
        paddingTop: 90,
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
    body: {
        flex: 1,
        alignItems: 'center',
        fontFamily: GlobalStyles.baseFont,
    },
    footer: {
        flex: 1,
        zIndex: -1,
        width: '100%',
        alignItems: 'center',
    },
    bgImage: {
        resizeMode: 'cover',
        width: '100%',
        height: 270,
        position: 'absolute',
        bottom: 0,
        zIndex: -1,
    },
})