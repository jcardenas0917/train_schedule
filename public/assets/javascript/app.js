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

  // Get a reference to the database 
  var database = firebase.database().ref("train");
  console.log(database);

 

  database.on("child_added", function (snapshot) {
    var train = snapshot.val()
    console.log(train);

    var name = train.name;
    var dest = train.destination;
    var freq = train.frequency
    var next = train.next_train;
    var away = train.min_away;
    
    console.log(name);
    console.log(dest);
    console.log(freq);
    console.log(next);
    console.log(away);



    var tBody = $("#trainDisplay");
    var tRow = $("<tr>");
    var trainName = $("<th>").text(train.name);
    var trainDest = $("<th>").text(train.destination);
    var trainFreq = $("<th>").text(train.frequency + "mm");
    var trainNext = $("<th>").text(train.next_train);
    var minAway = $("<th>").text(train.min_away);

    // Append the newly created table data to the table row
    tRow.append(trainName, trainDest, trainFreq, trainNext, minAway);
    // Append the table row to the table body
    tBody.append(tRow);

  });
 
  var currentTimeDisplay = moment().format('hh:mm A');
  $("#currentTime").text(currentTimeDisplay);
  

function writeData(name,destination,next,frequency,away){
    database.push({ 
    name: name,
    destination: destination,
    next_train: next,
    frequency: frequency,
    min_away: away
  });

}

$("#submit").on("click", function (event) {
event.preventDefault();
//Set input variables from user

  var trainName= $("#tname").val();
  var destination= $("#destination").val();
  var firstTrain= $("#firstTrain").val();
  var frequency= $("#frequency").val();

//train time calculations go here and result will sent to writeData function.

var firstTime = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTime);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var nextTrainMin = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + nextTrainMin);

    // Next Train
    var nextTrain = moment().add(nextTrainMin, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var frequencyTime = moment(frequency, 'mm').format(':mm');


  writeData(trainName, destination, nextTrain, frequencyTime,nextTrainMin );
  
})


});