import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type PasswordFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  helperText?: string;
};

export default function PasswordField({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
}: PasswordFieldProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(59, 74, 98, 0.52)"
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
          importantForAutofill="no"
          style={styles.input}
          selectionColor="#8A9BB8"
          cursorColor="#42618F"
          underlineColorAndroid="transparent"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <Pressable
          onPress={() => setSecureTextEntry((previousValue) => !previousValue)}
          hitSlop={8}
          style={styles.toggleButton}>
          <Text style={styles.toggleText}>
            {secureTextEntry ? 'Mostrar' : 'Ocultar'}
          </Text>
        </Pressable>
      </View>

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
    color: '#314765',
  },
  inputContainer: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFEFC',
    borderWidth: 1,
    borderColor: '#D9E0E8',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerFocused: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C4CFDC',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#243447',
  },
  toggleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#42618F',
  },
  helperText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#5F718C',
    paddingLeft: 2,
  },
});