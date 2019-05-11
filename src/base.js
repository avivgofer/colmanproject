import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCJ07GQB05llBA8_Fl3Z-ENfYkcRz8Dqig",
    authDomain: "colmanptoject.firebaseapp.com",
    databaseURL: "https://colmanptoject.firebaseio.com",
    projectId: "colmanptoject",
    storageBucket: "colmanptoject.appspot.com",
    messagingSenderId: "764413341841"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export { app, base }