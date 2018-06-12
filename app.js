$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyC3mjUoj-RAJK8UFT8DICfOWIaTJi5msPo",
    authDomain: "trains-4b4e4.firebaseapp.com",
    databaseURL: "https://trains-4b4e4.firebaseio.com",
    projectId: "trains-4b4e4",
    storageBucket: "trains-4b4e4.appspot.com",
    messagingSenderId: "412431519387"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();


    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = moment($("#time-input").val().trim(), "HH:mm a").format("X");
    var frequency = $("#frequency-input").val().trim();


    var newTrain = {
      name: trainName,
      going: destination,
      start: trainStart,
      rate: frequency
    };


    database.ref().push(newTrain);


    console.log(newTrain.name);
    console.log(newTrain.going);
    console.log(newTrain.start);
    console.log(newTrain.rate);

   


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });


  database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());


    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().going;
    var trainStart = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;


    console.log(trainName);
    console.log(destination);
    console.log(trainStart);
    console.log(frequency);

    
    var nextArrival = moment.unix(trainStart).format("HH:mm a");

    
    var countDown = moment().diff(moment(trainStart, "X"), "minutes");
    console.log(countDown);

    

    
    $("#t-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
      frequency + "</td><td>" + trainStart + "</td><td>" + countDown + "</td><td>" + nextArrival + "</td></tr>");
  });
})