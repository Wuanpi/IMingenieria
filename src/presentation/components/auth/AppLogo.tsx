import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';

const LOGO_ASPECT_RATIO = 220 / 100;

export default function AppLogo() {
  const { width } = useWindowDimensions();

  const isSmallWidth = width <= 360;
  const isLargeWidth = width >= 430;

  // Mismas reglas del panel para no romper la card
  const panelWidth = isSmallWidth ? width - 32 : isLargeWidth ? 400 : width - 44;
  const panelPadding = isSmallWidth ? 20 : 24;

  // Espacio real disponible dentro de la card
  const availableWidth = panelWidth - panelPadding * 2;

  // El logo crece, pero nunca supera el ancho útil del formulario
  const logoWidth = Math.min(Math.max(availableWidth * 0.93, 220), availableWidth);
  const logoHeight = logoWidth / LOGO_ASPECT_RATIO;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/logo2.png')}
        style={[styles.logo, { width: logoWidth, height: logoHeight }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 2,
  },
  logo: {
    alignSelf: 'center',
  },
});