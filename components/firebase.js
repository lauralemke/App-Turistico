import * as firebase from 'firebase';
import firestore from 'firebase/firestore'; 


var firebaseConfig = {
apiKey: "AIzaSyDRsIZ2xKheGyqoSKQlamEnYDn6MWeF-zU",
    authDomain: "aulapdm2020-8da7d.firebaseapp.com",
    databaseURL: "https://aulapdm2020-8da7d.firebaseio.com",
    projectId: "aulapdm2020-8da7d",
    storageBucket: "aulapdm2020-8da7d.appspot.com",
    messagingSenderId: "852737477600",
    appId: "1:852737477600:web:def1169c08f3cc9eb97985"
};
try {
  if (!firebase.apps.lenght){
  firebase.initializeApp(firebaseConfig);
  }
  firebase.firestore();
} catch (e) {
  console.log('O App recarregou');
}
export default firebase;