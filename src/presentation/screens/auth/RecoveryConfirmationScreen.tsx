import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import AppLogo from '../../components/auth/AppLogo';
import AuthScreenContainer from '../../components/auth/AuthScreenContainer';
import PrimaryButton from '../../components/auth/PrimaryButton';

export default function RecoveryConfirmationScreen() {
  const { email } = useLocalSearchParams<{ email?: string | string[] }>();

  const resolvedEmail = Array.isArray(email) ? email[0] : email ?? '';

  return (
    <AuthScreenContainer>
      <AppLogo />

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>

        <Text style={styles.title}>¡Solicitud enviada!</Text>

        <Text style={styles.description}>
          Hemos recibido tu solicitud de recuperación de acceso.
        </Text>

        <Text style={styles.emailLabel}>Correo registrado</Text>

        <View style={styles.emailBox}>
          <Text style={styles.emailText}>{resolvedEmail}</Text>
        </View>

        <Text style={styles.note}>
          Tiempo estimado de respuesta: 24 horas hábiles.
        </Text>

        <PrimaryButton
          title="Volver al inicio"
          onPress={() => router.replace('/(auth)/login')}
        />
      </View>
    </AuthScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#DEE8F4',
    borderWidth: 1,
    borderColor: '#CCD8E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  checkIcon: {
    fontSize: 38,
    fontWeight: '800',
    color: '#4A648C',
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
  emailLabel: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '700',
    color: '#5F7084',
    alignSelf: 'flex-start',
  },
  emailBox: {
    width: '100%',
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9E0E8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  emailText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#243447',
    textAlign: 'center',
  },
  note: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6D7C8F',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 2,
  },
});