import React, {useState, useReducer} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
const initialState = {people: []};

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        people: [...state.people, action.payload],
      };
    case 'sum':
      state.people.forEach(el => {
        let a = parseInt(el.age);
        el.age = a + 1;
      });
      return {
        people: state.people,
      };
    case 'rest':
      state.people.forEach(el => {
        let a = parseInt(el.age);
        el.age = a - 1;
      });
      return {
        people: state.people,
      };
    default:
      return state;
  }
}

const T = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {people} = state;

  const [values, setValues] = useState({
    name: '',
    age: '',
    counter: 0,
  });
  const newUser = {
    name: values.name,
    age: values.age,
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        style={{borderColor: 'black', borderWidth: 1}}
        placeholder="name"
        value={values.name}
        onChangeText={value => setValues({...values, name: value})}
      />
      <TextInput
        style={{borderColor: 'black', borderWidth: 1}}
        placeholder="age"
        value={values.age}
        onChangeText={value => setValues({...values, age: value})}
      />
      <Button
        title="Add"
        onPress={() => (
          dispatch({type: 'add', payload: newUser}),
          setValues(prevState => ({
            ...prevState,
            name: '',
            age: '',
          }))
        )}
      />
      <View style={{justifyContent: 'center'}}>
        <Text style={{alignSelf: 'center', fontSize: 25}}>
          {values.counter}
        </Text>
        <Button
          title="-"
          onPress={() => (
            setValues(prevState => ({
              ...prevState,
              counter: prevState.counter - 1,
            })),
            dispatch({type: 'rest'})
          )}
        />
        <Button
          title="+"
          onPress={() => (
            setValues(prevState => ({
              ...prevState,
              counter: prevState.counter + 1,
            })),
            dispatch({type: 'sum'})
          )}
        />
      </View>
      <FlatList
        data={people}
        keyExtractor={(item, idx) => `${item.name}${idx}`}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.age}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default T;
