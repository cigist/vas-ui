importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js');

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
messaging.setBackgroundMessageHandler(function(payload){
  const title = 'exaq'
  const options = {
    body: payload.notification,
    icon:'https://exact.co.id/x.png'
  };
  return self.registration.showNotification(title, options);
});
