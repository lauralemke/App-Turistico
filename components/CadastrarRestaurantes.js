import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Button,
  Form,
  Item,
  Input,
  Label,
  List,
  ListItem,
  Radio,
  Right,
  Left,
} from 'native-base';

import { FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import firebase from './firebase';
const image = { uri: 'https://i.ibb.co/t27jQ4M/verdecerto.png' };
export default class CadastrarRestaurantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      nome: null,
      descricao: null,
      endereco: null,
      arrayRestaurantes: [],
    };
    this.carregarDados();
  }

  salvar = () => {
    let itemId = this.state.id;

    if (itemId != null) {
      console.log(itemId);
      console.log(this.state.nome);

      firebase
        .database()
        .ref('restaurantes/' + itemId)
        .update({
          nome: this.state.nome,
          descricao: this.state.descricao,
          endereco: this.state.endereco,

        })
        .then(() => {
          console.log('Atualizando');
        })
        .catch((error) => {
          console.log(error);
        });
        alert('Atualizando...');

    } else {
      firebase
        .database()
        .ref('restaurantes')
        .push({
          nome: this.state.nome,
          descricao: this.state.descricao,
          endereco: this.state.endereco,

        })
        .then(() => {
          console.log('Inserido!');
        })
        .catch((error) => {
          console.log(error);
        });
    

    alert('Salvando...');
  }
this.props.navigation.goBack();
  };
  clearData = () => {
    this.setState({
      id: null,
      nome: null,
     descricao: null,
     endereco: null,

    });
  };

  carregarDados = async () => {
    const { route } = this.props;
    const { restaurantesKey } = route.params;

    const refRestaurantes = firebase.database().ref('restaurantes/' + restaurantesKey);

    var that = this;

    await refRestaurantes.once('value').then((snapshot) => {
      that.setState({
        id: restaurantesKey,
        nome: snapshot.val().nome,
        descricao: snapshot.val().descricao,
        endereco: snapshot.val().endereco,
      });
    });
  };

  remover = (key) => {
    const vetorRestaurantes = this.state.arrayRestaurantes;

    vetorRestaurantes.splice(key, 1);

    alert('removendo..' + key);
  };

  render() {
    return (
      <Container>
      <ImageBackground source={image} style={styles.image}>
        <Content scrollEnabled={true}>
          <Form>
            <Item floatingLabel>
              <Label>Nome:</Label>
              <Input
                name="nome"
                value={this.state.nome}
                onChangeText={(texto) => this.setState({ nome: texto })}
              />
            </Item>

            <Item floatingLabel>
              <Label>Descrição:</Label>
              <Input
                name="descricao"
                value={this.state.descricao}
                onChangeText={(texto) => this.setState({ descricao: texto })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Endereço:</Label>
              <Input
                name="endereco"
                value={this.state.endereco}
                onChangeText={(texto) => this.setState({ endereco: texto })}
              />
            </Item>
        <Text>    </Text>
            <Button full success onPress={() => this.salvar()}>
              <FontAwesome5
                color={'white'}
                style={{ paddingRight: 16 }}
                solid={true}
                size={20}
                name={'save'}
              />
              <Text>{this.state.id==null ? 'Salvar':'Editar'}</Text>
            </Button>
          </Form>
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  image: {
     flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});

