import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Hospital from '../../../../models/Hospital'
import GlobalStyles from '../../../../styles/general/global_styles'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

const AboutHospital = (props: any) => {
    const hospital: Hospital = props?.route?.params?.hospital
  return (
    <View style={styles.container}>
        <Text style={styles.description}>Indraprastha Cancer Society and Research Centre, is a “not for profit organization”, formed under the Societies Registration Act 1860 and it had set up Rajiv Gandhi Cancer Institute and Research Centre, a standalone oncology care centre, in Delhi, in 1996. </Text>
        
        <PrimaryButton title="Book Appointment" onPress={() => props.navigation.navigate('BookAppointment', {hospital: hospital})} />
    </View>
  )
}

export default AboutHospital

const styles = StyleSheet.create({
    container : {
        flex : 1,
        fontFamily: GlobalStyles.baseFont,
        backgroundColor: GlobalStyles.white,
        color: GlobalStyles.black,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        marginBottom: 32
    },
    description: {
        fontSize: 16,
        color: GlobalStyles.grey900,
        marginHorizontal: 24,
        marginVertical: 24,
        lineHeight: 20
    }
})