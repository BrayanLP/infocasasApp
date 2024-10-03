import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';

const HeaderTitle = () => {
  return (
    <Text style={styles.title}>
      <Image
        source={{
          uri: 'https://cdn2.infocasas.com.uy/web/5ee3722bdec05_infocdn__logo-infocasas@2x.png',
        }}
        style={styles.logo} // Usamos un estilo para definir dimensiones
        resizeMode="contain"
      />
      Task Manager
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // textAlign: 'center',
    // paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 120,
    height: 20,
    marginRight: 10, // Agrega margen para que haya espacio entre el logo y el texto
  },
});

export default HeaderTitle;
