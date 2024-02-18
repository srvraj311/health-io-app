import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyles from '../../styles/general/global_styles'

const HeadingTexts = ({ text1, text2 }: { text1: string, text2: string }): JSX.Element => {
    return (
        <View style={headingTextStyles.headingsConrtainer}>
            <Text style={headingTextStyles.headings} >{text1}</Text>
            <Text style={[headingTextStyles.headings, headingTextStyles.primary]} > {text2}</Text>
        </View >
    )
}

const headingTextStyles = StyleSheet.create({
    headingsConrtainer: {
        marginTop: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headings: {
        fontFamily: GlobalStyles.baseFont,
        fontSize: 22,
        textTransform: 'uppercase',
        fontWeight: '700',
        color: GlobalStyles.black
    },
    primary: {
        color: GlobalStyles.primaryColour
    }
})

export default HeadingTexts