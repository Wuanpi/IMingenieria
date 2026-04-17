import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type AuthTextFieldProps = TextInputProps & {
  label: string;
  helperText?: string;
};

export default function AuthTextField(props: AuthTextFieldProps) {
  const { label, helperText, style, ...textInputProps } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...textInputProps}
        style={[styles.input, isFocused && styles.inputFocused, style]}
        onFocus={(event) => {
          setIsFocused(true);
          textInputProps.onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          textInputProps.onBlur?.(event);
        }}
        selectionColor="#90A0B8"
        cursorColor="#4A648C"
        underlineColorAndroid="transparent"
        placeholderTextColor="rgba(70, 85, 105, 0.55)"
      />

      {helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#32475F',
  },
  input: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9E0E8',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#243447',
  },
  inputFocused: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C5CEDA',
  },
  helperText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#65758A',
    paddingLeft: 2,
  },
});