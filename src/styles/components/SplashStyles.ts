import { StyleSheet } from "react-native";
import GlobalStyles from "../general/global_styles";

const splashStyle = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GlobalStyles.white,
    },
    icon : {
        height: 125,
        width: 141,
    },
    text: {
        fontFamily: GlobalStyles.baseFont,
        fontSize: 16,
        marginTop: 16,
        color: GlobalStyles.grey500
    },

    image: {
        height: 125,
        width: 141,
        resizeMode: 'cover',
    },
})

export default splashStyle;