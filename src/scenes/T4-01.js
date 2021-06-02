import React, {useState, useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const db = SQLite.openDatabase({name: 'mydata'});
const T = ({navigation}) => {
  const [datas, setDatas] = useState([]);
  useEffect(function () {
    db.transaction(function (t) {
      t.executeSql(
        'CREATE TABLE IF NOT EXISTS notes (' +
          'id    INTEGER         PRIMARY KEY     AUTOINCREMENT,' +
          'title        VARCHAR(128)    NOT NULL,' +
          'description       VARCHAR(128)     NOT NULL' +
          ');',
        [],
        () => console.log('CREATED TABLE notes'),
        error => console.log({error}),
      );
    });
  }, []);
  useEffect(
    function () {
      navigation.addListener('focus', function () {
        db.transaction(function (t) {
          t.executeSql(
            'SELECT * FROM notes',
            [],
            function (tx, res) {
              let data = [];
              for (let i = 0; i < res.rows.length; i++) {
                data.push(res.rows.item(i));
              }
              setDatas(data);
            },
            error => {
              console.log({error});
            },
          );
        });
      });
    },
    [navigation],
  );
  return (
    <View
      style={{
        justifyContent: 'center',
      }}>
      <Text style={{alignSelf: 'center', fontSize: 30}}>Note App</Text>
      {datas && (
        <FlatList
          style={{padding: '20'}}
          data={datas}
          keyExtractor={e => e.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{borderWidth: '2', borderRadius: '10'}}
              onPress={() => navigation.navigate('show', item)}>
              <Text>{item.title} </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Button title="Create" onPress={() => navigation.navigate('create')} />
    </View>
  );
};

export const Create = ({navigation}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });
  const btnAgregarOnPress = function () {
    if (form.title.length > 0) {
      Alert.alert('Favor de poner titulo');
      return;
    }
    if (form.description.length > 0) {
      Alert.alert('Favor de poner description');
      return;
    }

    db.transaction(function (t) {
      t.executeSql(
        'INSERT INTO notes (title, description) VALUES (?,?)',
        [form.title, form.description],
        function (tx, res) {
          console.log(res);
          navigation.navigate('TT');
        },
        error => console.log({error}),
      );
    });
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Text>Create Note</Text>
      <TextInput
        style={{borderWidth: '3'}}
        value={form.title}
        onChangeText={e => setForm({...form, title: e})}
      />
      <TextInput
        style={{borderWidth: '3'}}
        value={form.description}
        onChangeText={e => setForm({...form, description: e})}
      />
      <Button title="Create" onPress={btnAgregarOnPress} />
    </View>
  );
};

export const Show = ({route: {params}, navigation}) => {
  function onEliminarPress() {
    Alert.alert(
      '¿Desea elminar?',
      '¿Está seguro que desea elminar el registro?\nEsta acción no se puede deshacer',
      [
        {
          text: 'Sí',
          onPress: v => {
            db.transaction(tx => {
              tx.executeSql(
                'DELETE FROM notes WHERE id = ?',
                [params.id],
                (tx, res) => {
                  if (res.rowsAffected === 0) {
                    Alert.alert(
                      'Fallo al eliminar',
                      'No se eliminó el registro',
                    );
                    return;
                  }

                  navigation.navigate('TT');
                },
                error => console.log(error),
              );
            });
          },
        },
        {
          text: 'No',
        },
      ],
    );
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
      }}>
      <Text>{params.title} </Text>
      <Text>{params.description} </Text>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          title="update"
          onPress={() => navigation.navigate('update', params)}
        />
        <Button title="delete" onPress={onEliminarPress} />
      </View>
    </View>
  );
};

export const Update = ({route: {params}, navigation}) => {
  const [form, setForm] = useState({
    title: params.title,
    description: params.description,
  });
  function onGuardarPress() {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE notes SET title = ?, description = ? WHERE id = ?',
        [form.title, form.description, params.id],
        (tx, result) => {
          if (result.rowsAffected.length === 0) {
            Alert.alert('No se actualizaron los datos. Intente de nuevo');
            return;
          }

          Alert.alert('Datos actualizados correctamente');
          navigation.navigate('TT');
        },
        error => console.log(error),
      );
    });
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <TextInput
        style={{borderWidth: '3'}}
        value={form.title}
        onChangeText={e => setForm({...form, title: e})}
      />
      <TextInput
        style={{borderWidth: '3'}}
        value={form.description}
        onChangeText={e => setForm({...form, description: e})}
      />
      <Button title="update" onPress={onGuardarPress} />
      <Button title="go back" onPress={() => navigation.navigate('TT')} />
    </View>
  );
};
export default T;
