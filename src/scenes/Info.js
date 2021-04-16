import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';

const Info = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'https://sic.cultura.gob.mx/galeria_imagen/5e2ecc98d3b52instecdcolima.jpg',
        }}
        style={{height: 100, width: 100}}
      />
      <Text>Joaquin Niembro Bueno Gómez</Text>
      <Text>17460095</Text>
      <Text>Ingeniería en Informática</Text>
      <Text>8vo Semestre</Text>
      <Button
        title="Go to Color"
        onPress={() => navigation.navigate('Color')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 100,
    marginVertical: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Info;
