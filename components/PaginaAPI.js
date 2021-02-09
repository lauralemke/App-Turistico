import React, { Component } from 'react';

import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Text,
  Label,
  Item,
  Card,
  Input,
} from 'react-native';

export default class PaginaAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  loadLugares = async () => {
    await fetch('https://restcountries.eu/rest/v2/')
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({ data: resJson });
        
      })
      .catch((e) => console.log(e));
  };

  componentDidMount() {
    this.loadLugares();
    console.log(this.state.data);
  }

  renderItemComponent = (data) => (
    <TouchableOpacity
      style={{
        height: 300,
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 6,
      }}>
      <Text>{data.name}</Text>
      <Text>{data.region}</Text>
      <Text>{data.population}</Text>
      <Image
        style={{
          height: '100%',
          borderRadius: 4,
        }}
        source={{ uri: data.flag }}
      />
    </TouchableOpacity>
  );

  render() {
      const image = { uri: 'https://i.ibb.co/5YjfVYv/verdecerto.png' };
    return (
           <View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
              <View>
               <Text style={{fontSize:'20px'}}>Nome: {item.name}</Text>
             <Text style={{fontSize:'15px'}}>Região: {item.region}</Text>
            <Text style={{fontSize:'15px'}}> População: {item.population}</Text>
               <Text>  </Text>
            </View>
          )}
       />
   
    </View>
    );
  }
}