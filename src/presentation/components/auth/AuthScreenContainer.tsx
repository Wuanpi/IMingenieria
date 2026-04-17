import { ReactNode } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

type AuthScreenContainerProps = {
  children: ReactNode;
};

export default function AuthScreenContainer({
  children,
}: AuthScreenContainerProps) {
  const { width, height } = useWindowDimensions();

  const isNarrowDevice = width < 360;
  const isWideDevice = width > 430;
  const isShortDevice = height < 760;

  // Mantiene el fondo centrado como antes
  const backgroundScale = isNarrowDevice ? 1.08 : isWideDevice ? 1.0 : 0.85;

  // Negativo = izquierda / Positivo = derecha
  const backgroundTranslateX = isNarrowDevice ? -6 : isWideDevice ? 0 : -240;

  // Negativo = subir / Positivo = bajar
  const backgroundTranslateY = isShortDevice ? -8 : -300;

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../../../../assets/images/fondo.png')}
        style={styles.background}
        resizeMode="cover"
        imageStyle={[
          styles.backgroundImage,
          {
            transform: [
              { scale: backgroundScale },
              { translateX: backgroundTranslateX },
              { translateY: backgroundTranslateY },
            ],
          },
        ]}>
        <LinearGradient
          colors={[
            'rgba(15, 23, 42, 0.14)',
            'rgba(15, 23, 42, 0.30)',
            'rgba(15, 23, 42, 0.72)',
          ]}
          style={StyleSheet.absoluteFillObject}
        />

        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" />

          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.contentContainer}>
              <View style={styles.cardShadow}>
                <View style={styles.card}>{children}</View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
  },
  flex: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    // Si luego quieres moverlo manualmente:
    // izquierda = negativo / derecha = positivo
    // arriba = negativo / abajo = positivo
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  cardShadow: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 28,
    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.16,
    shadowRadius: 22,
    elevation: 10,
  },
  card: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: '#F6F2EC',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.78)',
  },
});