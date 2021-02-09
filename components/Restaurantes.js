import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Button,
  H3,
  Form,
  Item,
  Label,
  Input,
  Text,
  Icon,
  List,
  ListItem,
  Separator
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from './firebase';

export default class Restaurantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayRestaurantes: null,
      search: null,
    };
  }
  componentDidMount() {
    this.carregarDados();
  }

  carregarDados = () => {
    firebase
      .database()
      .ref('restaurantes')
      .on('value', (snapshot) => {
        var vetorTemp = [];
        snapshot.forEach((child) => {
          vetorTemp.push({
            id: child.key,
            nome: child.val().nome,
            descricao: child.val().descricao,
            endereco: child.val().endereco,
          });
        });
        this.setState({ arrayRestaurantes: vetorTemp });
      });
    console.log(this.state.arrayRestaurantes);
  };

  remover = async (key) => {
    console.log(key);
    await firebase
      .database()
      .ref('restaurantes/' + key)
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
      const newArray = this.state.arrayRestaurantes.filter((item) => {
        const itemDado = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
        const textDado = text.toUpperCase();

        return itemDado.indexOf(textDado) > -1;
      });
      this.setState({
        arrayRestaurantes: newArray,
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
            <Button
              title="Cadastrar Restaurantes"
              info
              success
              onPress={() => {
                this.props.navigation.navigate('Cadastrar Restaurantes', {
                  nome: 'Laura',
                });
              }}>
              <Text>
                
                <FontAwesome5 name="plus" size={20} /> Cadastrar Restaurantes{' '}
              </Text>
            </Button>
            <Text>   </Text>
  <Form>
               <Text>Quer contribuir? Informe um nome para sua imagem:</Text>
                <Item style={{ padding: 18}} floatingLabel last>
                  <Label>Nome da imagem</Label>
                  <Input
                    name="nomeFoto"
                    required 
                    value={this.state.nomeFoto}
                    onChangeText={(text) => this.setState({ nomeFoto: text })}
                  />
                </Item>
              </Form>
  <Button
                title="Cadastrar imagem"
                info
                success
                onPress={() => {
                  this.props.navigation.navigate('Camera', {
                    namepic: this.state.nomeFoto,
                  });
                }}>
                <Text>
                 <FontAwesome5 name="plus" size={20}/>
                  Cadastrar Imagem {' '}
                </Text>
                </Button>
            <Card style={{ flex: 0 }}>
              <CardItem header>
                <H3> Fish Beer</H3>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={require('../assets/fishbeer.jpg')}
                    style={{ height: 150, width: 330, flex: 1 }}
                  />
                  <Text>
                    Onde você encontra as melhores porções e o chopp mais gelado
                    de Xanxerê. Excelente localização. Boa musica e os petiscos
                    mais saborosos da cidade.{' '}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
              
                <Text> Avenida Brasil, 1400, Centro </Text>
              </CardItem>
            </Card>

            <Card style={{ flex: 0 }}>
              <CardItem header>
                <H3> Kiosque Sorriso </H3>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={require('../assets/kiosque.jpg')}
                    style={{ height: 150, width: 330, flex: 1 }}
                  />
                  <Text>
                    {' '}
                    Servem lanches, porções de frios, fritas, bebidas em geral.
                    Possui mesas de sinuca e disponibilidade de assistir jogos
                    dos Campeonatos Estaduais, Taça Libertadores e Campeonato
                    Brasileiro Série A e B. Horário de funcionamento: Segunda-
                    feira à domingo das 13:00 à 00:00.
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
              
                <Text> Av. Brasil, 800, Centro </Text>
              </CardItem>
            </Card>

            <Card style={{ flex: 0 }}>
              <CardItem header>
                <H3> Subway Xanxerê </H3>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={require('../assets/subway.jpg')}
                    style={{ height: 150, width: 330, flex: 1 }}
                  />
                  <Text>
                    {' '}
                    Atualmente, a marca SUBWAY é a maior cadeia de sanduíches do
                    mundo, com mais de 39 mil unidades em todo o mundo. Horário
                    de funcionamento: 11h30 às 23h.{' '}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                
                <Text> Rua Victor Konder, 595, Centro </Text>
              </CardItem>
            </Card>

          <Separator style={{backgroundColor:"white"}}>
                <H3> Adicionar mais Restaurantes: </H3>
              </Separator>
<Header
              searchBar
              rounded
              style={{ backgroundColor: 'transparent' }}>
              <Item>
                <Input
                  placeholder="Pesquisar"
                  onChangeText={(text) => this.pesquisar(text)}
                  value={this.state.search}
                />
                <FontAwesome5 name="search" size={18} />
              </Item>
            </Header>
            <List style={{ flex: 0 }}>
              <FlatList
                data={this.state.arrayRestaurantes}
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
                            <H3 style={styles.titulo}>{item.nome}</H3>
                          </CardItem>
                          <CardItem>
                            <Text style={styles.texto}>{item.descricao}</Text>
                          </CardItem>
<CardItem>
                            <Text style={styles.texto}>{item.endereco}</Text>
                          </CardItem>
                          <CardItem>
                            <Button
                              success
                              onPress={() => {
                                this.props.navigation.navigate(
                                  'Cadastrar Restaurantes',
                                  {
                                    restaurantesKey: item.id,
                                  }
                                );
                              }}>
                              <Text>Editar</Text>
                            </Button>
                            <Text> </Text>
                            <Button
                              success
                              onPress={() => {
                                Alert.alert(
                                  'Excluir Sugestão',
                                  'Deseja realmente excluir o restaurante?',
                                  [
                                    {
                                      text: 'Cancel',
                                      onPress: () =>
                                        console.log('Cancel Pressed'),
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
            <Button full success onPress={() => this.props.navigation.goBack()}>
              <Text>Voltar</Text>
            </Button>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    width: 350,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
