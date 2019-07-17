$(document).ready(function () {
  console.log("ready!");

// Set the configuration for your app
// TODO: Replace with your project's config object
  const firebaseConfig = {
    apiKey: "AIzaSyCZuq4ogqQbBDn3XRjmOLL4eDN-zvoWvaA",
    authDomain: "train-schedule-ucf.firebaseapp.com",
    databaseURL: "https://train-schedule-ucf.firebaseio.com",
    projectId: "train-schedule-ucf",
    storageBucket: "train-schedule-ucf.appspot.com",
    messagingSenderId: "174634230088",
    appId: "1:174634230088:web:b8c47afbb6c93d07"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);

// // Get a reference to the database service
// var database = firebase.database();


$("#submit").on("click", function (value) {
event.preventDefault();
//Set input variables from user
var train = {
  trainName: $("#tname").val(),
  destination: $("#destination").val(),
  firstTrain: $("#firstTrain").val(),
  frequency: $("#frequency").val(),
}
  //console loging for debuging
  console.log(train.trainName);
  console.log(train.destination);
  console.log(train.firstTrain);
  console.log(train.frequency);
});



  
 


});