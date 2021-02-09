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

import { FlatList, TouchableOpacity,StyleSheet, ImageBackground } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import firebase from './firebase';
const image = { uri: 'https://i.ibb.co/t27jQ4M/verdecerto.png' };
export default class CadastrarSugestao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      nome: null,
      email: null,
      sugestao: null,
      arraySugestao: [],
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
        .ref('sugestao/' + itemId)
        .update({
          nome: this.state.nome,
          email: this.state.email,
          sugestao: this.state.sugestao,
        })
        .then(() => {
          console.log('Atualizando');
        })
        .catch((error) => {
          console.log(error);
        });
        alert('Atualizadno...');

    } else {
      firebase
        .database()
        .ref('sugestao')
        .push({
          nome: this.state.nome,
          email: this.state.email,
          sugestao: this.state.sugestao,
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
      email: null,
      sugestao: null,
    });
  };

  carregarDados = async () => {
    const { route } = this.props;
    const { sugestaoKey } = route.params;

    const refSugestao = firebase.database().ref('sugestao/' + sugestaoKey);

    var that = this;

    await refSugestao.once('value').then((snapshot) => {
      that.setState({
        id: sugestaoKey,
        nome: snapshot.val().nome,
        email: snapshot.val().email,
        sugestao: snapshot.val().sugestao,
      });
    });
  };

  remover = (key) => {
    const vetorSugestao = this.state.arraySugestao;

    vetorSugestao.splice(key, 1);

    alert('removendo..' + key);
  };

  render() {
    return (
      <Container>
          <ImageBackground source={image} style={styles.image}>
        <Content scrollEnabled={true}>
          <Form>
            <Item floatingLabel>
              <Label>Nome</Label>
              <Input
                name="nome"
                value={this.state.nome}
                onChangeText={(texto) => this.setState({ nome: texto })}
              />
            </Item>

            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                name="email"
                value={this.state.email}
                onChangeText={(texto) => this.setState({ email: texto })}
              />
            </Item>

            <Item floatingLabel last>
              <Label>Sugestao</Label>
              <Input
                name="sugestao"
                value={this.state.sugestao}
                onChangeText={(texto) => this.setState({ sugestao: texto })}
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


