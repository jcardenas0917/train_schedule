$(document).ready(function () {
    console.log("ready!");

    var rowId = 0;
    

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

    //====================================================
    // Get a reference to the database
    var database = firebase.database();
    console.log(database);

    //====================================================
    var ref = database.ref();
    ref.on("value", function (data) {
        console.log(data.val());
        var id = data.val();
        var keys = Object.keys(id);
        console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            console.log(k);
            // keys[i].remove();
                var tBody = $("#trainDisplay");
            var tRow = $("<tr>").attr("id", rowId);
            remove = $("<button>").attr("id", k).text("X");

            tRow.append(remove);
            // Append the table row to the table body
            tBody.append(tRow);
            
        }

    });


//==============================================================================




    database.ref().on("child_added", function (snapshot) {
        var train = snapshot.val();
        console.log(train);

        //Get Data from Firebase
        var name = train.name;
        var destination = train.destination;
        var firstTrain = train.first_train;
        var frequency = train.frequency;


        var firstTime = moment(firstTrain, "hh:mm").subtract(1, "years");

        // Current Time

        var currentTimeLive = moment().format("hh:mm A");

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
        var tRow = $("<tr>").attr("id", rowId);
        // var remove = $("<button>").attr("id", k).text("X");
        var trainName = $("<th>").text(name);
        var trainDest = $("<th>").text(destination);
        var trainFreq = $("<th>").text("Every :" + frequency + " minutes");
        var trainNext = $("<th>").text(nextArrival);
        var minAway = $("<th>").text(nextTrainMinDisplay);
        rowId++;

        // Append the newly created table data to the table row
        tRow.append(trainName, trainDest, trainFreq, trainNext, minAway);
        // Append the table row to the table body
        tBody.append(tRow);
        displayRealTime();


    });

    // function gotData(data){
    //     // console.log(data.val());
    //     // var id = data.val();
    //     // var keys = Object.keys(id);
    //     // console.log(keys);
    //     // for (var i = 0; i <keys.length; i++){
    //     //     // var k = keys[i];
    //     //     // console.log(k);
    //     //     keys[i].remove();
    //     }


 
    //Display current time
    function displayRealTime() {
        setInterval(function () {
            $("#currentTime").html(moment().format("hh:mm A"));

            //at the minute mark comparison
            if (moment().format("ss") === "00") {
                // location.reload(true);

                console.log("new minute passe " + moment().format("hh:mm:ss"));
            }
        }, 1000);
    }
    displayRealTime();

    //Start on click function

    $("#submit").on("click", function (event) {
        event.preventDefault();

        //Set input variables from user

        var trainName = $("#tname").val();
        var destination = $("#destination").val();
        var firstTrain = $("#firstTrain").val();
        var frequency = $("#frequency").val();

        //clear values
        $("input").val("");

        //push values to Firebase DB
        database.ref().push({
            name: trainName,
            destination: destination,
            first_train: firstTrain,
            frequency: frequency
        });
    });
});
