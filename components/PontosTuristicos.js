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
import { Image, FlatList, TouchableOpacity, Alert, StyleSheet, ImageBackground} from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from './firebase';

export default class PontosTuristicos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayPTuristico: null,
      search: null,
    };
  }
  componentDidMount() {
    this.carregarDados();
  }

  carregarDados = () => {
    firebase
      .database()
      .ref('pturistico')
      .on('value', (snapshot) => {
        var vetorTemp = [];
        snapshot.forEach((child) => {
          vetorTemp.push({
            id: child.key,
            nome: child.val().nome,
            descricao: child.val().descricao,
          });
        });
        this.setState({ arrayPTuristico: vetorTemp });
      });
    console.log(this.state.arrayPTuristico);
  };

  remover = async (key) => {
    console.log(key);
    await firebase
      .database()
      .ref('pturistico/' + key)
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
      const newArray = this.state.arrayPTuristico.filter((item) => {
        const itemDado = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
        const textDado = text.toUpperCase();

        return itemDado.indexOf(textDado) > -1;
      });
      this.setState({
        arrayPTuristico: newArray,
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
              this.props.navigation.navigate('Cadastrar Ponto Turistico', {
                nome: 'Laura',
              });
            }}>
            <Text>
              {' '}
              <FontAwesome5 name="plus" size={20}/> Cadastrar Ponto Turistico{' '}
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
          <Card style={{flex: 0}}>
           <CardItem header>
             <H3> Praça Tiradentes</H3>
            </CardItem>
            <CardItem>
              <Body>
               <Image source={require('../assets/praca.jpg')} 
               style={{height: 150, width: 330, flex: 1}}/> 
                <Text > Localizada no centro da cidade, 
                é um lugar de diversão para todas as idades, 
                para sentar ao ar livre e fazer um piquenique 
                enquanto as crianças se divertem no parquinho. </Text>
              </Body>
            </CardItem>
          </Card>

          <Card style={{flex: 0}}>
           <CardItem header>
             <H3> Igreja Matriz </H3>
            </CardItem>
            <CardItem>
              <Body>
               <Image source={require('../assets/igreja.jpg')} 
               style={{height: 150, width: 330, flex: 1}}/> 
                <Text> Construída em meados de 1950, 
                Xanxerê se formou em volta desse antigo local de adoração católico. </Text>
              </Body>
            </CardItem>
          </Card>

           <Card style={{flex: 0}}>
           <CardItem header>
             <H3> Monumento do Milho </H3>
            </CardItem>
            <CardItem>
              <Body>
               <Image source={require('../assets/milhao.jpg')} 
               style={{height: 150, width: 330, flex: 1}}/> 
                <Text> Localizado no Parque de Exposições Rovilho Bortoluzzi, onde acontece periodicamente a Feira Estadual do Milho, representa a agricultura imprescindível para o município </Text>
              </Body>
            </CardItem>
          </Card>

   <Separator style={{backgroundColor:"white"}}>
             <H3> Adicionar mais Pontos Turísticos: </H3>
           </Separator>
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
          <List style={{ flex: 0}}>
          <FlatList
              data={this.state.arrayPTuristico}
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
                          <Text style={styles.texto}>
                         {item.descricao}
                          </Text>
                        </CardItem>

                        <CardItem>
                          <Button  success onPress={() => {
                            this.props.navigation.navigate(
                              'Cadastrar Ponto Turistico',
                              {
                                pturisticoKey: item.id,
                              }
                            );
                          }}>
                            <Text>Editar</Text>
                          </Button>
                          <Text>  </Text>
                          <Button  success onPress={() => {
                            Alert.alert(
                              'Excluir Sugestão',
                              'Deseja realmente excluir o ponto turístico?',
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
              <Button
                  full
                  success
                  onPress={() => this.props.navigation.goBack()}>
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
  }
});
