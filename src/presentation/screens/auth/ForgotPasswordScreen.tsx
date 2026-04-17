import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import AppLogo from '../../components/auth/AppLogo';
import AuthScreenContainer from '../../components/auth/AuthScreenContainer';
import AuthTextField from '../../components/auth/AuthTextField';
import PrimaryButton from '../../components/auth/PrimaryButton';
import { isValidEmail } from '../../../shared/utils/auth.utils';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleSendRequest = () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      Alert.alert('Campo requerido', 'Ingresa tu correo electrónico.');
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      Alert.alert('Correo inválido', 'Ingresa un correo electrónico válido.');
      return;
    }

    router.push({
      pathname: '/(auth)/recovery-confirmation',
      params: { email: normalizedEmail },
    });
  };

  return (
    <AuthScreenContainer>
      <Pressable
        style={styles.backButton}
        onPress={() => router.replace('/(auth)/login')}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </Pressable>

      <AppLogo />

      <View style={styles.content}>
        <Text style={styles.title}>Recupera tu acceso</Text>

        <Text style={styles.description}>
          Ingresa tu correo electrónico y un asesor se pondrá en contacto contigo.
        </Text>

        <AuthTextField
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          placeholder="Ingresa tu correo"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />

        <Text style={styles.note}>
          Tiempo máximo de respuesta: 24 horas hábiles.
        </Text>

        <PrimaryButton title="Enviar solicitud" onPress={handleSendRequest} />
      </View>
    </AuthScreenContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A648C',
  },
  content: {
    gap: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D4057',
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#5F7084',
    textAlign: 'center',
  },
  note: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6D7C8F',
    textAlign: 'center',
    fontWeight: '600',
  },
});