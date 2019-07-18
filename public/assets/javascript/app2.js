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
var database = firebase.database();


$("#submit").on("click", function (value) {
    event.preventDefault();

    var trainName = $("#tname").val();
    var destination = $("#destination").val();
    var firstTrain = $("#firstTrain").val();
    var frequency = $("#frequency").val();

    var militaryTime = moment(firstTrain, 'HH:mm').format('hh:mm a');

    var frequencyTime = moment(frequency, 'mm').format(':mm');



    console.log(frequencyTime);



    database.ref().push({

        name: trainName,
        destination: destination,
        first_train: militaryTime,
        frequency: frequencyTime,
    });
    
  
})
database.ref().on("value", function(snapshot) {
    var train = snapshot.val()
    console.log(train);

    console.log(snapshot.val().name);

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
    


})

var currentTime = moment().format('h:mm A');
$("#currentTime").text(currentTime);
console.log(currentTime);
