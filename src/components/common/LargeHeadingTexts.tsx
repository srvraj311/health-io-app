import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyles from '../../styles/general/global_styles'

const LargeHeadingTexts = ({ text1, text2 }: { text1: string, text2: string }): JSX.Element => {
    return (
        <View style={largeHeadingTexts.headingsConrtainer}>
            <Text style={largeHeadingTexts.headings} >{text1}</Text>
            <Text style={[largeHeadingTexts.headings, largeHeadingTexts.primary]} > {text2}</Text>
        </View >
    )
}

const largeHeadingTexts = StyleSheet.create({
    headingsConrtainer: {
        marginTop: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 345
    },
    headings: {
        fontFamily: GlobalStyles.baseFont,
        fontSize: 32,
        fontWeight: '700',
        color: GlobalStyles.black,
    },
    primary: {
        color: GlobalStyles.primaryColour
    }
})

export default LargeHeadingTexts