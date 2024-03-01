import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyles from '../../styles/general/global_styles'

const HeadingTextsHome = ({ text1, text2 }: { text1: string, text2: string }): JSX.Element => {
    return (
        <View style={headingTextStyles.headingsContainer}>
            <Text style={headingTextStyles.headings} >{text1}</Text>
            <View></View>
            <Text style={[headingTextStyles.headings, headingTextStyles.primary]} >{text2}</Text>
        </View >
    )
}

const headingTextStyles = StyleSheet.create({
    headingsContainer: {
        marginTop: 32,
        display: 'flex',
        width: 365,
        marginLeft: 24,
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    headings: {
        fontFamily: GlobalStyles.baseFont,
        fontSize: 32,
        fontWeight: '700',
        color: GlobalStyles.secondaryColor,
    },
    primary: {
        color: GlobalStyles.grey50,
    }
})

export default HeadingTextsHome