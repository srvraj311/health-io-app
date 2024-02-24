import { StyleSheet } from "react-native";

const splashStyle = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },

    text: {
        color: 'white'
    },

    image: {
        height: 125,
        width: 141,
        resizeMode: 'cover',
    },
})

export default splashStyle;