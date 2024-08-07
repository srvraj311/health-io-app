import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import GlobalStyles from '../../styles/general/global_styles'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet'

const HeadingTextsHome = ({ text1, text2 }: { text1: string, text2: string }): JSX.Element => {
    const headingTextStyles = StyleSheet.create({
        headingsContainer: {
            marginTop: 32,
            display: 'flex',
            width: SCREEN_WIDTH,
            marginLeft: 24,
            flexDirection: 'column',
            alignItems: 'flex-start',
    
        },
        headings: {
            fontFamily: GlobalStyles.baseFont,
            fontSize: Number(SCREEN_WIDTH) < 390 ? 28 : 32,
            fontWeight: '700',
            width: '90%',
            textAlign: 'left',
            color: GlobalStyles.secondaryColor,
        },
        primary: {
            color: GlobalStyles.grey50,
        }
        
    })

    return (
        <View style={headingTextStyles.headingsContainer}>
            <Text style={headingTextStyles.headings} >{text1}</Text>
            <View></View>
            <Text style={[headingTextStyles.headings, headingTextStyles.primary]} >{text2}</Text>
        </View >
    )
}



export default HeadingTextsHome