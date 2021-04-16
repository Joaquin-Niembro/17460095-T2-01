import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Color = ({navigation}) => {
  const [color, setColor] = useState('red');
  return (
    <View style={styles.container}>
      <Button title="Blue" onPress={() => setColor('blue')} />
      <Button title="red" onPress={() => setColor('red')} />
      <Text style={{color: color}}>COLOR</Text>
      <Button title="go to info" onPress={() => navigation.navigate('Info')} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 60,
    marginVertical: 100,
  },
});
export default Color;
