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

export default class Hoteis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayHoteis: null,
      search: null,
    };
  }
  componentDidMount() {
    this.carregarDados();
  }

  carregarDados = () => {
    firebase
      .database()
      .ref('hoteis')
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
        this.setState({ arrayHoteis: vetorTemp });
      });
    console.log(this.state.arrayHoteis);
  };

  remover = async (key) => {
    console.log(key);
    await firebase
      .database()
      .ref('hoteis/' + key)
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
      const newArray = this.state.arrayHoteis.filter((item) => {
        const itemDado = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
        const textDado = text.toUpperCase();

        return itemDado.indexOf(textDado) > -1;
      });
      this.setState({
        arrayHoteis: newArray,
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
              title="Cadastrar"
              info
              success
              onPress={() => {
                this.props.navigation.navigate('Cadastrar Hoteis', {
                  nome: 'Laura',
                });
              }}>
              <Text>
                
                <FontAwesome5 name="plus" size={20} /> Cadastrar Hotel{' '}
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
                <H3> Seville</H3>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={require('../assets/seville.jpg')}
                    style={{ height: 150, width: 330, flex: 1 }}
                  />
                  <Text>
                   O Seville Park Hotel oferece uma hospedagem aconchegante e sofisticada. A beleza arquitetônica é apenas um dos aspectos que tornam a estadia única. O hotel possibilita ainda uma experiência gastronômica requintada diariamente no café-da-manhã e jantar. Em uma área de 7000 m² com total segurança, os hospedes dispõe de estacionamento coberto, piscina coberta aquecida, academia, 3 auditórios para eventos e 2 elevadores.
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
              
                <Text>Av. Brasil, 2500, Centro </Text>
              </CardItem>
            </Card>

            <Card style={{ flex: 0 }}>
              <CardItem header>
                <H3> Center Hotel </H3>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={require('../assets/centerhotel.jpg')}
                    style={{ height: 150, width: 330, flex: 1 }}
                  />
                  <Text>
                    {' '}
                   O Center Hotel dispõe de apartamentos standard, super luxo, suítes e apartamentos para portadores de necessidades especiais, cuidadosamente decorados e confortáveis. O restaurante, oferece pratos da gastronomia italiana, realçando o sabor da colonização da região. 
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
              
                <Text> Rua Independência, 230 </Text>
              </CardItem>
            </Card>

            <Card style={{ flex: 0 }}>
              <CardItem header>
                <H3> Hotel Gazziero </H3>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={require('../assets/gazziero.jpg')}
                    style={{ height: 150, width: 330, flex: 1 }}
                  />
                  <Text>
                    {' '}
                    O hotel fica próximo a rodoviária municipal. É aconchegante, possui 16 quartos. Serve café da manhã.
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                
                <Text> R. Nereu Ramos, 802 </Text>
              </CardItem>
            </Card>

               <Separator style={{backgroundColor:"white"}}>
                <H3> Adicionar mais Hoteis: </H3>
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
                data={this.state.arrayHoteis}
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
                                  'Cadastrar Hoteis',
                                  {
                                    hoteisKey: item.id,
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
