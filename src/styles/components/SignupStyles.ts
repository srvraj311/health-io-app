import { StyleSheet } from "react-native";
import GlobalStyles from "../general/global_styles";

export const signupNavigationOptions = {
    headerShown: true,
    title: '', // set from app.tsx,
    headerBackTitleStyle: {

    },
    headerBackTitleVisible: false, // set from app.tsx
    headerBackVisible: false,
    headerStyle: {
        backgroundColor: GlobalStyles.pagBackground
    }
}

export const signupStyles = StyleSheet.create({
    scrollView: {
        maxHeight: 1080,
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: GlobalStyles.pagBackground,
        height: 'auto'
    },
    header: {
        fontFamily: GlobalStyles.baseFont,
        fontSize: 24,
        color: GlobalStyles.black,
        borderBottomWidth: 2,
        borderBottomColor: GlobalStyles.primaryColour,
        paddingBottom: 8
    },
    borderPrimary: {
        height: 3,
        width: 500,
        backgroundColor: GlobalStyles.primaryColour
    },
    keyboardViewContainer: {
        flex: 1,
        backgroundColor: GlobalStyles.pagBackground,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'space-between',
        width: '100%',
        height: 'auto'
    },
    containerNonHeader: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: GlobalStyles.pagBackground,
        alignItems: 'center',
        fontFamily: GlobalStyles.baseFont,
    },
    containerIos: {
        flex: 1,
        paddingTop: 100,
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
        color: GlobalStyles.grey500,
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
    },
    topPaddingNone: {
        paddingTop: 0
    },
    topPadding: {
        paddingTop: 122
    },
    textLinkContainer: {
        width: 345,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',

    },
    textLinkLeft: {
        fontFamily: GlobalStyles.baseFont,
        fontSize: 14,
        marginTop: 16,
        color: GlobalStyles.grey500,
        textShadowOffset: { width: 3, height: 3 }, // X and Y offset (no offset)
        textShadowRadius: 6, // Blur radius for the shadow
        textShadowColor: 'white', // Shadow color
    },
    textLink: {
        color: GlobalStyles.secondaryColor,
    },
    footer: {
        flex: 1,
        zIndex: -1,
        width: '100%',
        alignItems: 'center',
    },
})