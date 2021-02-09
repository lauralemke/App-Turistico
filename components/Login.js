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
import {ImageBackground, StyleSheet} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }
  logar = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login ok');
        this.props.navigation.navigate('Página Inicial');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        if (error.code === 'auth/invalid-email') {
          Toast.show({
            text: 'Email ou senha invalido!',
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
              <Text>   </Text>
              <Button full style={{backgroundColor:'green'}} onPress={() => this.logar()}>
                <Text>Login</Text>
              </Button>
<Text>  </Text>
              <Button
                full
                success
                onPress={() =>
                  this.props.navigation.navigate('Cadastrar Usuário')
                }>
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
