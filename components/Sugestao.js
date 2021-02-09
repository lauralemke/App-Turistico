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
  Left, Icon
} from 'native-base';

import { FlatList, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import firebase from './firebase';

// Your web app's Firebase configuration

export default class Sugestao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arraySugestao: null,
      search: null,
    };
  }
  componentDidMount() {
    this.carregarDados();
  }

  carregarDados = () => {
    /*
    firebase
      .database()
      .ref('Sugestao')
      .once('value', (data) => {
        this.setState({ arraySugestao: Object.values(data.toJSON()) });
        console.log(Object.values(data.toJSON()));
      }); */
    firebase
      .database()
      .ref('sugestao')
      .on('value', (snapshot) => {
        var vetorTemp = [];
        snapshot.forEach((child) => {
          vetorTemp.push({
            id: child.key,
            nome: child.val().nome,
            email: child.val().email,
            sugestao: child.val().sugestao,
          });
        });
        this.setState({ arraySugestao: vetorTemp });
      });
    console.log(this.state.arraySugestao);
  };

  remover = async (key) => {
    console.log(key);
    await firebase
      .database()
      .ref('sugestao/' + key)
      .remove()
      .then(() => {
        console.log('Removido..');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  pesquisar = (text) => {
    if (text != '') {
      const newArray = this.state.arraySugestao.filter((item) => {
        const itemDado = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
        const textDado = text.toUpperCase();

        return itemDado.indexOf(textDado) > -1;
      });
      this.setState({
        arraySugestao: newArray,
        search: text,
      });
    } else {
      this.carregarDados();
      this.setState({ search: null });
    }
  };

  render() {
    const { route } = this.props;
const image = { uri: 'https://i.ibb.co/t27jQ4M/verdecerto.png' };
    return (

      <Container>
        <ImageBackground source={image} style={styles.image}>
        <Content scrollEnabled={true}>
          <Header searchBar rounded style={{backgroundColor:"transparent"}}>
            <Item>
             
              <Input
                placeholder="Pesquisar"
                onChangeText={(text) => this.pesquisar(text)}
                value={this.state.search}
              />
               <FontAwesome5 name="search" size={18} />
            </Item>
          </Header>
          <Button
            title="Cadastrar"
            info
             success
            onPress={() => {
              this.props.navigation.navigate('Cadastrar Sugestão', {
                nome: 'Laura',
              });
            }}>
            <Text>
              {' '}
              <FontAwesome5 name="plus" size={20} /> Cadastrar{' '}
            </Text>
          </Button>
          <List style={{ flex: 1 }}>
          <FlatList
              data={this.state.arraySugestao}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <ListItem>
                  <TouchableOpacity activeOpacity={0.5}>
                    <Body
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignContent: 'center',
                        width: 325,
                      }}>
                      <Card style={styles.card}>
                        <CardItem header>
                          <Text style={styles.titulo}>{item.nome}</Text>
                        </CardItem>
                        <CardItem>
                          <Text style={styles.texto}>
                            EMAIL: {item.email}
                          </Text>
                        </CardItem>
                        <CardItem>
                          <Text style={styles.texto}>
                            SUGESTAO: {item.sugestao}
                          </Text>
                        </CardItem>
                        <CardItem>
                          <Button  success onPress={() => {
                            this.props.navigation.navigate(
                              'Cadastrar Sugestão',
                              {
                                sugestaoKey: item.id,
                              }
                            );
                          }}>
                            <Text>Editar</Text>
                          </Button>
                          <Text>  </Text>
                          <Button  success onPress={() => {
                            Alert.alert(
                              'Excluir Sugestão',
                              'Deseja realmente excluir a sugestão?',
                              [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK',
                                  onPress: () => this.remover(item.id),
                                },
                              ],
                              { cancelable: false }
                            );
                          }}>
                            <Text>Excluir</Text>
                          </Button>
                          </CardItem>
                          </Card>
                     
                    </Body>
                  </TouchableOpacity>
                </ListItem>
              )}></FlatList>
          </List>
        </Content>
            </ImageBackground>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
    width: 315,
  },
  image: {
     flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});