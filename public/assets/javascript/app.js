
 // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyCZuq4ogqQbBDn3XRjmOLL4eDN-zvoWvaA",
    authDomain: "train-schedule-ucf.firebaseapp.com",
    databaseURL: "https://train-schedule-ucf.firebaseio.com/",
    storageBucket: "gs://train-schedule-ucf.appspot.com/"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();