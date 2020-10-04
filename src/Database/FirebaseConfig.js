import firebase from "firebase";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCbvXM7h19Sqi2V2aNWHpT_lSqlgYKs1RA",
    authDomain: "keen-hope-224307.firebaseapp.com",
    databaseURL: "https://keen-hope-224307.firebaseio.com",
    projectId: "keen-hope-224307",
    storageBucket: "keen-hope-224307.appspot.com",
    messagingSenderId: "766943959049",
    appId: "1:766943959049:web:700ae6f34b60dff6f3c0d8"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export {storage,firebase as default};