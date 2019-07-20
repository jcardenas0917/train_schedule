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

        //Get Data from Firebase
        var name = train.name;
        var destination = train.destination;
        var firstTrain = train.first_train;
        var frequency = train.frequency;
        var frequencyTime = train.frequency_time;


        var firstTime = moment(firstTrain, "hh:mm").subtract(1, "years");

        // Current Time
        var currentTimeLive = moment().format('hh:mm A');

        console.log(currentTimeLive);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTime), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;

        // Minute Until Train
        var nextTrainMinDisplay = frequency - tRemainder;

        // Next Train
        var nextArrival = moment().add(nextTrainMinDisplay, "minutes").format("hh:mm A");

        //Display to HTML
        var tBody = $("#trainDisplay");
        var tRow = $("<tr>");
        var trainName = $("<th>").text(name);
        var trainDest = $("<th>").text(destination);
        var trainFreq = $("<th>").text("Every " + frequencyTime + " minutes");
        var trainNext = $("<th>").text(nextArrival);
        var minAway = $("<th>").text(nextTrainMinDisplay);

        // Append the newly created table data to the table row
        tRow.append(trainName, trainDest, trainFreq, trainNext, minAway);
        // Append the table row to the table body
        tBody.append(tRow);

    });
    //Show current time
    var currentTime = moment().format('hh:mm A');
    $("#currentTime").text(currentTime);

    //Start on click function
    $("#submit").on("click", function (event) {
        event.preventDefault();

        //Set input variables from user

        var trainName = $("#tname").val();
        var destination = $("#destination").val();
        var firstTrain = $("#firstTrain").val();
        var frequency = $("#frequency").val();


        //train time calculations go here and result will sent to writeData function.

        var firstTime = moment(firstTrain, "hh:mm").subtract(1, "years");
        console.log("test" + firstTime);

        // Current Time
        var currentTime = moment().format('hh:mm A');

        console.log(currentTime);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTime), "minutes");
        

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // Minute Until Train
        var nextTrainMin = frequency - tRemainder;
        

        // Next Train
        var nextTrain = moment().add(nextTrainMin, "minutes").format("hh:mm A");
       
        //convert frequency to minutes
        var frequencyTime = moment(frequency, 'mm').format(':mm');

        // push all data needed to the datebase
        database.push({
            name: trainName,
            destination: destination,
            first_train: firstTrain,
            frequency: frequency,
            current_time: currentTime,
            next_train_min: nextTrainMin,
            next_train: nextTrain,
            frequency_time: frequencyTime

        });

    })


});