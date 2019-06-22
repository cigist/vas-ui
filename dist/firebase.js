// Initialize Firebase
var config = {
    apiKey: "AIzaSyBr3NS3Tb_taWdVqNQFSTJ5TlvvhN9gV08",
    authDomain: "myexact-app.firebaseapp.com",
    databaseURL: "https://myexact-app.firebaseio.com",
    projectId: "myexact-app",
    storageBucket: "myexact-app.appspot.com",
    messagingSenderId: "677893618882"
  };
  firebase.initializeApp(config);
  
  const messaging = firebase.messaging();
  messaging.requestPermission()
  .then(function(){
    return messaging.getToken();
  })
  .then(function(token){
    localStorage.setItem('_firbtid_',token);
  })
  .catch(function(err){
    console.log('Terjadi kesalahan', err);
  });
  messaging.onMessage(function(payload){
    console.log('onMessage.', payload);
  });