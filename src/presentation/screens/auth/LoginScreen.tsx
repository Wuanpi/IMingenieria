import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import AppLogo from '../../components/auth/AppLogo';
import AuthScreenContainer from '../../components/auth/AuthScreenContainer';
import AuthTextField from '../../components/auth/AuthTextField';
import PasswordField from '../../components/auth/PasswordField';
import PrimaryButton from '../../components/auth/PrimaryButton';
import {
  MAX_NATIONAL_ID_LENGTH,
  validateIdentifier,
} from '../../../shared/utils/auth.utils';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [identifierHelperText, setIdentifierHelperText] = useState('');
  const [password, setPassword] = useState('');

  const handleIdentifierChange = (value: string) => {
    const looksLikeEmail = /[a-zA-Z@._-]/.test(value);

    if (looksLikeEmail) {
      setIdentifier(value);
      setIdentifierHelperText('');
      return;
    }

    const digitsOnly = value.replace(/\D/g, '');

    if (digitsOnly.length > MAX_NATIONAL_ID_LENGTH) {
      setIdentifier(digitsOnly.slice(0, MAX_NATIONAL_ID_LENGTH));
      setIdentifierHelperText(
        `Máximo ${MAX_NATIONAL_ID_LENGTH} dígitos para la cédula.`
      );
      return;
    }

    setIdentifier(digitsOnly);
    setIdentifierHelperText('');
  };

  const handleLogin = () => {
    const identifierValidation = validateIdentifier(identifier);

    if (!identifierValidation.isValid) {
      Alert.alert(
        'Dato inválido',
        identifierValidation.message || 'Verifica los datos ingresados.'
      );
      return;
    }

    if (!password.trim()) {
      Alert.alert('Campo requerido', 'Ingresa tu contraseña.');
      return;
    }

    console.log({
      identifier: identifierValidation.normalizedValue,
      identifierType: identifierValidation.type,
      password,
    });

    router.replace('/(tabs)');
  };

  return (
    <AuthScreenContainer>
      <AppLogo />

      <View style={styles.form}>
        <AuthTextField
          label="Usuario"
          value={identifier}
          onChangeText={handleIdentifierChange}
          placeholder="Correo electrónico o cédula"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          helperText={identifierHelperText}
        />

        <PasswordField
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          placeholder="Ingresa tu contraseña"
        />

        <Pressable
          style={styles.linkContainer}
          onPress={() => router.push('/(auth)/forgot-password')}>
          <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
        </Pressable>

        <PrimaryButton title="Iniciar Sesión" onPress={handleLogin} />
      </View>
    </AuthScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  linkContainer: {
    alignSelf: 'center',
    marginTop: 2,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A648C',
  },
});