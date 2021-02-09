import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Root,
  Toast,
} from 'native-base';
import firebase from './firebase';
import  {ImageBackground, StyleSheet} from 'react-native';

export default class CadastrarUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }
  cadastrar = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Criado com sucesso!');
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);

        if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            text: 'Email já esta cadastrado!',
          });
        }

        if (error.code === 'The email address is badly formatted') {
          Toast.show({
            text: 'Email esta fora do formato padrão!',
          });
        }
      });
  };

  render() {
     const image = { uri: 'https://i.ibb.co/5YjfVYv/verdecerto.png' };
    return (
      <Root>
        <Container>
           <ImageBackground source={image} style={styles.image}>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={this.state.email}
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  name="password"
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                  secureTextEntry={true}
                />
              </Item>
              <Text>  </Text>
              <Button full style={{backgroundColor:'green'}} onPress={() => this.cadastrar()}>
                <Text>Cadastrar</Text>
              </Button>
            </Form>
          </Content>
          </ImageBackground>
        </Container>
      </Root>
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

