import { View, Text, StyleSheet, InputModeOptions } from 'react-native';
import React from 'react';
import { signupStyles } from '../../styles/components/SignupStyles';
import GlobalStyles from '../../styles/general/global_styles';
import { TextInput } from 'react-native-paper';

const PrimaryInput = ({
  onChangeText,
  secureTextEntry = false,
  placeholder,
  inputMode = 'text',
  errorText,
  defaultValue = '',
}: {
  onChangeText: (val: any) => void,
  secureTextEntry?: boolean,
  placeholder: string,
  inputMode?: InputModeOptions
  errorText?: string
  defaultValue?: string
}) => {
  const isError = errorText && errorText.length > 0 ? true : false;
  const [showPassword, setShowPassword] = React.useState(secureTextEntry);
  const label = isError ? errorText : placeholder
  return (



    <View style={styles.container}>
      <TextInput
        label={label}
        error={isError}
        defaultValue={defaultValue}
        mode='flat'
        onChangeText={onChangeText}
        secureTextEntry={showPassword}
        placeholderTextColor={GlobalStyles.grey400}
        contentStyle={{ color: GlobalStyles.grey950 }}
        style={[styles.input]}
        textColor={GlobalStyles.grey400}
        inputMode={inputMode}
        underlineStyle={styles.underline}
        right={
          secureTextEntry &&
          <TextInput.Icon size={24} icon={require('../../assets/icons/eye.png')} onPress={() => {
            setShowPassword((prev) => {
              return !prev
            })
          }} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  underline: {
    height: 0
  },
  input: {
    width: 345,
    height: 56,
    borderWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: GlobalStyles.primaryColour,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 5,
    backgroundColor: GlobalStyles.inputBackground,
    fontFamily: GlobalStyles.baseFont,
    fontSize: 16,
    color: GlobalStyles.grey400
  }
})

export default PrimaryInput;
