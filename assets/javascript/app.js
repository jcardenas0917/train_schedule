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

    database.ref().on("child_added", function (snapshot) {
        var train = snapshot.val();
        console.log(train);
        console.log(snapshot.key)
        var key = snapshot.key;
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
        var tRow = $("<tr>");
        var remove = $("<button>").attr("id", key).attr("class", "material-icons").text("delete");
        var trainName = $("<td>").text(name);
        var trainDest = $("<td>").text(destination);
        var trainFreq = $("<td>").text("Every :" + frequency + " minutes");
        var trainNext = $("<td>").text(nextArrival).attr("class", "next");
        var minAway = $("<td>").text(nextTrainMinDisplay).attr("class", "minutes");
        var refresh = $("<button>").attr("class", "material-icons").text("refresh");
        rowId++;
        // Append the newly created table data to the table row
        tRow.append(trainName, trainDest, trainFreq, trainNext, minAway, remove, refresh);
        // Append the table row to the table body
        tBody.append(tRow);
        displayRealTime();

        remove.on("click", function (event) {
            event.preventDefault();
            if ($(this).attr("id") === key) {
                console.log(key)
                database.ref(key).remove();
                $(this).closest('tr').remove();
            }

        });

        refresh.on("click", function (event) {
            event.preventDefault();
            location.reload();
        })

    });

    //===============================================================================

    //Display current time
    function displayRealTime(away) {
        console.log(away - 1)
        // $(".minutes").text(away-1)
        setInterval(function () {
            $("#currentTime").html(moment().format("hh:mm A"));
            // //at the minute mark comparison
            // if (moment().format("ss") === "00") {

            //     // console.log(moment().format("hh:mm A"))
            //     // console.log("new minute passe " + moment().format("hh:mm:ss"));

            // }
        }, 1000);

        // setInterval(function(){
        //     $(".minutes").text(away--)
        //     console.log(away--)
        // },60000)
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
