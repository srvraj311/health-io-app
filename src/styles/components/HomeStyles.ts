import { Platform, StyleSheet } from "react-native";
import GlobalStyles from "../general/global_styles";
const isIos = Platform.OS === 'ios';
const homeStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: GlobalStyles.pagBackground,
        flexDirection: 'column',
        flexGrow: 1,
        width: '100%',
    },
    margin: {
        flex: 1,
        marginTop: isIos ? 70 : 50,
    },
    topContainer: {
        height: 200,
        width: '100%',
    },
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: -1,
        height: 300,
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    iconContainer: {
        width: '88%',
        marginHorizontal: 24,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 8,
        flexDirection: 'row',
    },
    iconButton: {
        height: 50,
        width: 50,
    },
    icon: {
        height: 50,
        width: 50,
        resizeMode: 'cover',
    },
    body: {
        position: 'relative',
        borderTopLeftRadius: 40,
        top: -240,
        color: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'auto',
        marginTop: 300,
        backgroundColor: GlobalStyles.pagBackground,
    },
    horizontal: {
        flexDirection: 'row',
    },
    marginNegetative: {
        marginTop: 100
    }
});


export default homeStyles;