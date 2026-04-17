import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';

export default function AppLogo() {
  const { width } = useWindowDimensions();

  const logoWidth = width < 360 ? 130 : width > 430 ? 170 : 500;
  const logoHeight = width < 360 ? 42 : width > 430 ? 54 : 200;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/logo.png')}
        style={{ width: logoWidth, height: logoHeight }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 2,
  },
});