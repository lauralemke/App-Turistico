import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import firebase from './firebase';

export default class CameraPage extends Component {
   constructor(props) {
    super(props);
    const { route } = this.props;
    const { namepic } = route.params;
    this.state = {
      nomeFoto: namepic,
    };
  }
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Desculpe, Nos precisamos da permissão da camera para funcionar');
      }
    }
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  };

  selecionarImagem = async (nomeFoto) => {
    this.getPermissionAsync();
    if (this.state.hasPermission) {
      let foto = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      console.log(foto);
      if (!foto.cancelled) {
        this.uploadImage(foto.uri, nomeFoto)
         .then(() => {
            Alert.alert('Sucesso', 'Obrigada por contribuir! Sua imagem será analisada pelos desenvolverdores para depois ser colocada no app :)');
          })
          .catch((error) => {
            Alert.alert(error);
          });
      }
    }
  };

  tirarFoto = async (nomeFoto) => {
    this.getPermissionAsync();

    if (this.state.hasPermission) {
      const options = { quality: 0.5, base64: true };
      const foto = await this.camera.takePictureAsync(options);

      console.log(foto.uri);

      this.uploadImage(foto.uri, nomeFoto)
        .then(() => {
          Alert.alert('Sucesso', 'Obrigada por contribuir! Sua imagem será analisada pelos desenvolverdores para depois ser colocada no app :)');
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };

  uploadImage = async (uri, nomeImagem) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('images/' + nomeImagem);

    return ref.put(blob);
  };

  mudarCamera = async () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  render() {
    const { hasPermission } = this.state;

    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>Sem acesso a Camera </Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={(ref) => {
              this.camera = ref;
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 30,
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={() => this.selecionarImagem(this.state.nomeFoto)}>
                <Ionicons
                  name="ios-photos"
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={() => this.tirarFoto(this.state.nomeFoto)}>
                <FontAwesome5
                  name="camera"
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={() => this.mudarCamera()}>
                <MaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
          
        </View>

      );
    }
  }
}
