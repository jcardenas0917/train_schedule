$(document).ready(function () {
  console.log("ready!");

// Set the configuration for your app
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
 
  // Get a reference to the database 
  var database = firebase.database().ref("train");
  
function writeData(name,destination,time,frequency){
  var ref = database.push();
  ref.set({
    name: name,
    destination: destination,
    first_train: time,
    frequency: frequency,
  })
  ref.on('value',displayData);
}

function displayData(ref){
  var train = ref.val();

  //console log for debugging
  console.log(train.destination)
  console.log(train.first_train)
  console.log(train.frequency)
  console.log(train.name);

  
  var tBody = $("#trainDisplay");
  var tRow = $("<tr>");
  var trainName = $("<th>").text(train.name);
  var trainDest = $("<th>").text(train.destination);
  var trainFreq = $("<th>").text(train.frequency);
  var trainNext = $("<th>").text(train.first_train);
  var minAway = $("<th>").text("TBD");

  // Append the newly created table data to the table row
  tRow.append(trainName, trainDest, trainFreq,trainNext,minAway);
  // Append the table row to the table body
  tBody.append(tRow);
  
}

$("#submit").on("click", function (value) {
event.preventDefault();
//Set input variables from user

  var trainName= $("#tname").val();
  var destination= $("#destination").val();
  var firstTrain= $("#firstTrain").val();
  var frequency= $("#frequency").val();

//train time calculations go here and result will sent to writeData function.
  var militaryTime = moment(firstTrain,'HH:mm').format('hh:mm a');



  writeData(trainName,destination,militaryTime,frequency);
})


});