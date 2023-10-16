const { initializeApp } = require('firebase/app');
const { getDatabase } = require("firebase/database");
const firebaseConfig = {
  apiKey: "AIzaSyCMVt_ielV6dUwTekLkGsoWebgLMuNlKdA",
  authDomain: "gothic-context-401609.firebaseapp.com",
  databaseURL: "https://gothic-context-401609-default-rtdb.firebaseio.com",
  projectId: "gothic-context-401609",
  storageBucket: "gothic-context-401609.appspot.com",
  messagingSenderId: "785461453802",
  appId: "1:785461453802:web:90dfcfacb76296f2bc4893",
  measurementId: "G-CYYLV901F9",
  databaseURL:"https://gothic-context-401609-default-rtdb.firebaseio.com/"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
module.exports = database;
