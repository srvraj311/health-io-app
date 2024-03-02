import { StyleSheet } from "react-native";
import GlobalStyles from "../general/global_styles";

export const hStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.pagBackground,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: GlobalStyles.grey100
    },
    bottomSheet: {

    },
    header: {
        marginTop: 16,
        flexDirection: 'column',
    },
    filterContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
    }
})