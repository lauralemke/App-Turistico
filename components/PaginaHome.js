import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function PaginaHome({ navigation }) {
  const image = { uri: 'https://i.ibb.co/5YjfVYv/verdecerto.png' };
  return (
    <View >
     <ImageBackground source={image} style={{ resizeMode: 'cover',
    justifyContent: 'center', height:'100%'
     }}>
     <View>
    <Image style={styles.logo} source={require('../assets/corn2.png')} />
     <Text style={styles.paragraph}>
        Xanxerê
      </Text>
    <View style={styles.container}>
      <Icon.Button
      style={{height: 68,width: 159}}
    name="heart"
    backgroundColor="transparent"
    color="green"
     onPress={() =>
          navigation.navigate('Video', {
            nome: 'Laura',
          }) }>
Conheça Xanxerê
  </Icon.Button>
    
       
    <Icon.Button  style={{height: 68,width: 109}}
    name="map"
  backgroundColor="transparent"
    color="green"
     onPress={() =>
          navigation.navigate('Mapa', {
            nome: 'Laura',
          }) }>
    Mapa
  </Icon.Button>
       <Icon.Button  style={{height: 68,width: 100}}
    name="road"
    backgroundColor="transparent"
    color="green"
     onPress={() =>
          navigation.navigate('PontosTuristicos', {
            nome: 'Laura',
          }) }>
    Pontos Turísticos
  </Icon.Button>
           <Icon.Button  style={{height: 68,width: 125}}
    name="hotel"
    backgroundColor="transparent"
    color="green"
     onPress={() =>
          navigation.navigate('Hoteis', {
            nome: 'Laura',
          }) }>
    Hospedagem
  </Icon.Button>
              <Icon.Button  style={{height: 68,width: 109}}
    name="cutlery"
  backgroundColor="transparent"
    color="green"
     onPress={() =>
          navigation.navigate('Restaurantes', {
            nome: 'Laura',
          }) }>
    Restaurantes
  </Icon.Button>
          <Icon.Button 
            style={{height: 68,width: 107}}
    name="plane"
   backgroundColor="transparent"
    color="green"
     onPress={() =>
          navigation.navigate('Pagina API', {
            nome: 'Laura',
          }) }>
   + Lugares Para Visitar
  </Icon.Button>
  
   <Icon.Button  style={{height: 68,width: 109}}
    name="comments-o"
  backgroundColor="transparent"
    color="green"
     onPress={() =>
          navigation.navigate('Sugestao', {
            nome: 'Laura',
          })
        }
  >
    Sugestão
  </Icon.Button>
    </View>
    </View>
      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
alignItems:'center',
flexWrap:'wrap',
    justifyContent: 'space-around',
    paddingTop:10,
    paddingRight:18,
    paddingLeft:18,
    
  },
  paragraph: {
    margin: 24,
    marginTop: 20,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
    marginTop:0,
    marginLeft:120,
    paddingTop:0
  },
 
});
