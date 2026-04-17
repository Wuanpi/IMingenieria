import { ReactNode } from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
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

  const isSmallWidth = width <= 360;
  const isLargeWidth = width >= 430;
  const isShortHeight = height < 760;

  const panelWidth = isSmallWidth ? width - 32 : isLargeWidth ? 400 : width - 44;
  const panelPadding = isSmallWidth ? 20 : 24;

  // Fondo en PNG, centrado y ajustado sin romper el panel
  const backgroundScale = isSmallWidth ? 1.05 : isLargeWidth ? 1.0 : 1.03;

  // Negativo = izquierda / Positivo = derecha
  const backgroundTranslateX = isSmallWidth ? -4 : isLargeWidth ? 0 : -2;

  // Negativo = subir / Positivo = bajar
  const backgroundTranslateY = isShortHeight ? -8 : -14;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.root}>
        <ImageBackground
          source={require('../../../../assets/images/fondo.jpg')}
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
              <View
                style={[
                  styles.contentContainer,
                  isShortHeight && styles.contentContainerShort,
                ]}>
                <TouchableWithoutFeedback onPress={() => {}} accessible={false}>
                  <View style={[styles.cardShadow, { width: panelWidth }]}>
                    <View style={[styles.card, { padding: panelPadding }]}>
                      {children}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    // Si luego quieres mover el fondo manualmente:
    // izquierda = negativo / derecha = positivo
    // arriba = negativo / abajo = positivo
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  contentContainerShort: {
    justifyContent: 'flex-start',
    paddingTop: 24,
  },
  cardShadow: {
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
    backgroundColor: '#F6F2EC',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.78)',
  },
});