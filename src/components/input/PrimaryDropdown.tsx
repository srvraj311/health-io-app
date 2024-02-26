import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { List } from 'react-native-paper';
import GlobalStyles from '../../styles/general/global_styles';
import { Dropdown } from 'react-native-material-dropdown';


const PrimaryDropdown = ({
    list, label, value, setValue
}: {
    list: { label: string, value: string }[],
    label: string,
    value: string,
    setValue: (val: string) => void,
}) => {
    return (
        <View style={styles.container}>
            <Dropdown
                pickerStyle={styles.pickerStyle}
                label='Blood Group'
                selectedItemColor={GlobalStyles.primaryColour}
                rippleColor='transparent'
                containerStyle={styles.input}
                useNativeDriver={true}
                overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                renderBase={() => (
                    <View>
                        <Text style={styles.labelStyle}>{label}</Text>
                        <List.Item
                            titleStyle={styles.titleStyle}
                            contentStyle={styles.innerItem}
                            title={list.find(e => e.value === value)?.label}
                        />
                        <List.Icon
                            style={styles.iconStyle}
                            icon={require('../../assets/icons/chevron-down.png')}
                            color={GlobalStyles.grey600}
                        />
                    </View>
                )}
                value={label}
                data={list}
                onChangeText={val => setValue(val)}
            />
        </View>
    )
}

export default PrimaryDropdown

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
    },
    input: {
        width: 345,
        height: 56,
        borderWidth: 1,
        borderColor: GlobalStyles.primaryColour,
        paddingHorizontal: 10,
        paddingVertical: 0,
        borderRadius: 5,
        backgroundColor: GlobalStyles.inputBackground,
    },
    pickerStyle: {
        height: 200,
        width: 345,
        paddingHorizontal: 10,
        paddingVertical: 0,
        backgroundColor: GlobalStyles.inputBackground,
        fontFamily: GlobalStyles.baseFont,
        fontSize: 16,
        color: GlobalStyles.grey100,
        marginStart: 16,
        borderColor: GlobalStyles.primaryColour,
        borderRadius: 5,
        borderWidth: 1
    },
    innerItem: {
        backgroundColor: GlobalStyles.inputBackground,
        fontFamily: GlobalStyles.baseFont,
        fontSize: 16,
        color: GlobalStyles.grey400,
    },
    titleStyle: {
        fontFamily: GlobalStyles.baseFont,
        fontSize: 16,
        color: GlobalStyles.grey900,
        backgroundColor: GlobalStyles.inputBackground,
        marginTop: Platform.OS === 'android' ? -15 : -10,
        position: 'relative',
        left: -12,
    },
    labelStyle: {
        fontFamily: GlobalStyles.baseFont,
        marginTop: 5,
        fontSize: 12,
        color: GlobalStyles.grey400,
        backgroundColor: GlobalStyles.inputBackground,
    },
    iconStyle: {
        backgroundColor: GlobalStyles.inputBackground,
        position: 'absolute',
        top: 15,
        right: 0
    }
})