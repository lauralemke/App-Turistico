import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createStore } from 'redux'; 

import PaginaHome from './components/PaginaHome';
import Sugestao from './components/Sugestao';
import CadastrarSugestao from './components/CadastrarSugestao';
import CadastrarRestaurantes from './components/CadastrarRestaurantes';
import CadastrarPTuristico from './components/CadastrarPTuristico';
import CadastrarHoteis from './components/CadastrarHoteis';
import CameraPage from './components/CameraPage';
import MapaExemplo from './components/MapaExemplo';
import PontosTuristicos from './components/PontosTuristicos';
import Restaurantes from './components/Restaurantes';
import Hoteis from './components/Hoteis';
import PaginaAPI from './components/PaginaAPI';
import Login from './components/Login';
import CadastrarUsuario from './components/CadastrarUsuario';
import Video from './components/Video';


import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }


    const Stack = createStackNavigator();

    return (
      <Container>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Página Inicial" component={PaginaHome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastrar Usuário" component={CadastrarUsuario} />
            <Stack.Screen name="Sugestao" component={Sugestao} />
            <Stack.Screen name="Cadastrar Sugestão" component={CadastrarSugestao} />
            <Stack.Screen name="Camera" component={CameraPage} />
            <Stack.Screen name="Mapa" component={MapaExemplo} />
             <Stack.Screen name="PontosTuristicos" component={PontosTuristicos} /> 
                 <Stack.Screen name="Cadastrar Ponto Turistico" component={CadastrarPTuristico} /> 
                 <Stack.Screen name="Restaurantes" component={Restaurantes} /> 
                 <Stack.Screen name="Cadastrar Restaurantes" component={CadastrarRestaurantes} /> 
                  <Stack.Screen name="Hoteis" component={Hoteis} />
                 <Stack.Screen name="Cadastrar Hoteis" component={CadastrarHoteis} /> 
                  <Stack.Screen name="Pagina API" component={PaginaAPI} /> 
                    <Stack.Screen name="Video" component={Video} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </Container>
    );
  }
}
