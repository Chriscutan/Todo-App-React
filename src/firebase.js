import {initializeApp} from "firebase/app"
import {collection, getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAKdN0uHhvD4I9Nf2XDgmTEpk6OpAJYY1k",
  authDomain: "todo-app-1e384.firebaseapp.com",
  projectId: "todo-app-1e384",
  storageBucket: "todo-app-1e384.appspot.com",
  messagingSenderId: "1038023852988",
  appId: "1:1038023852988:web:cdc8018489386d5acc61b9"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, "Todos");

export {db, colRef};