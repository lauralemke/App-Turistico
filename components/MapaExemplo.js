 import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -26.8771818;
const LONGITUDE = -52.406374;
const LATITUDE_DELTA = 0.0222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapaExemplo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    coordinate: { latitude: LATITUDE, longitude: LONGITUDE },
    coordinate2: { latitude: -26.8764628, longitude: -52.4047618 },
    coordinate3: { latitude:-26.8828825, longitude: -52.438178},
    coordinate4: { latitude:-26.8816842, longitude: -52.3863554},
    coordinate5: { latitude:-26.8791066, longitude: -52.4085627},
    coordinate6: { latitude:-26.8725495, longitude: -52.40676},
    coordinate7: { latitude:-26.8788343, longitude: -52.3968385},
    coordinate8: { latitude:-26.8773838, longitude: -52.4020824},
    coordinate9: { latitude:-26.8775179, longitude: -52.4100323},

    };
  
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={this.state.region}>
          <Marker
            coordinate={this.state.coordinate}
            title={'Igreja Matriz'}>
            <Text
              style={{
                backgroundColor: 'green',
                padding: 2,
                borderColor: '#D23F44',
                color: '#FFFFFF',
                fontSize: 20,
              }}>
              Igreja Matriz
            </Text>
          </Marker>
        
          <Marker
            coordinate={this.state.coordinate2}
            title={'Praça Tiradentes '}>
            <Text
              style={{
                backgroundColor: 'green',
                padding: 2,
                borderColor: '#D23F44',
                color: '#FFFFFF',
                fontSize: 20,
              }}>
              Praça Tiradentes 
            </Text>
          </Marker>
        
          <Marker
            coordinate={this.state.coordinate3}
            title={'Monumento do Milho'}>
            <Text
              style={{
                backgroundColor: 'green',
                padding: 2,
                borderColor: '#D23F44',
                color: '#FFFFFF',
                fontSize: 20,
              }}>
            Monumento do Milho
            </Text>
          </Marker>

           <Marker
            coordinate={this.state.coordinate4}
            title={'Seville Hotel'}>
            <Text
              style={{
                backgroundColor: 'green',
                padding: 2,
                borderColor: '#D23F44',
                color: '#FFFFFF',
                fontSize: 20,
              }}>
              Seville
            </Text>
          </Marker>

          <Marker
            coordinate={this.state.coordinate5}
            title={'Center Hotel'}>
            <Text
              style={{
                backgroundColor: 'green',
                padding: 2,
                borderColor: '#D23F44',
                color: '#FFFFFF',
                fontSize: 20,
              }}>
              Center Hotel
            </Text>
          </Marker>
          
          <Marker
            coordinate={this.state.coordinate6}
            title={'Hotel Gazziero'}>
            <Text
              style={{
                backgroundColor: 'green',
                padding: 2,
                borderColor: '#D23F44',
                color: '#FFFFFF',
                fontSize: 20,
              }}>
             Hotel Gazziero
            </Text>
          </Marker>

          
          <Marker
            coordinate={this.state.coordinate7}
            title={'Fish Beer'}>
            <Text
              style={{
                backgroundColor: 'green',
                padding: 2,
                borderColor: '#D23F44',
                color: '#FFFFFF',
                fontSize: 20,
              }}>
             Fish Beer
            </Text>
          </Marker>

          <Marker
            coordinate={this.state.coordinate8}
            title={'Kiosque Sorriso'}>
            <Text
              style={{
                backgroundColor: 'green',
                padding: 2,
                borderColor: '#D23F44',
                color: '#FFFFFF',
                fontSize: 20,
              }}>
             Kiosque Sorriso
            </Text>
          </Marker>
          <Marker
            coordinate={this.state.coordinate9}
            title={'Subway'}>
            <Text
              style={{
                backgroundColor: 'green',
                padding: 2,
                borderColor: '#D23F44',
                color: '#FFFFFF',
                fontSize: 20,
              }}>
             Subway
            </Text>
          </Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
}); 
