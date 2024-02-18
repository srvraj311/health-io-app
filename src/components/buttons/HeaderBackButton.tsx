import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import GlobalStyles from '../../styles/general/global_styles'

const HeaderBackButton = ({ onPress }: any) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
            <Image
                source={require('../../assets/images/back.png')}
                style={{ width: 24, height: 24, tintColor: GlobalStyles.secondaryColor }} // Customize style as needed
            />
        </TouchableOpacity>
    )
}

export default HeaderBackButton