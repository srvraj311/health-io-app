import { StyleSheet } from "react-native";
import GlobalStyles from "../general/global_styles";

export const hStyles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 24,
        backgroundColor: 'transparent',
        height: 150,
        zIndex: -1,
        marginTop: -20,
    },
    contentContainer: {
        zIndex: -1,
        flex: 1,
        alignItems: 'center',
        backgroundColor: GlobalStyles.white
    },
    bottomSheet: {
        elevation: 3,
        zIndex: 1
    },
    header: {
        marginTop: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
    },
    headerImage: {
        position: 'absolute',
        top: 0,
        zIndex: -2,
        height: 200,
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        width: '100%',
    },
    image : {
        zIndex: -2,
        width: '100%',
        height: 300,
        resizeMode: 'cover'
    },
    hospitalCardContainer : {
        borderTopLeftRadius:40,
        zIndex: -1,
        marginTop: 0,
        // marginTop: -490,
        flex: 1,
        minWidth: '100%',
        width: '100%',
        backgroundColor: GlobalStyles.white,
        height: '100%',
        marginBottom: -60,
        paddingVertical: 20,
    },
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: GlobalStyles.white,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%'
    },
    scrollView: {
        maxHeight: 1080,
        flexGrow: 1,
        justifyContent: 'flex-start',
        backgroundColor: GlobalStyles.white,
        height: 'auto'
    },
})