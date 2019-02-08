

$(document).ready(function() {

var config = {
  apiKey: "AIzaSyDid2hU78t12thtucMUpFeVJOMs1AuRYsw",
  authDomain: "train-schedule-e3b4c.firebaseapp.com",
  databaseURL: "https://train-schedule-e3b4c.firebaseio.com",
  projectId: "train-schedule-e3b4c",
  storageBucket: "train-schedule-e3b4c.appspot.com",
  messagingSenderId: "183638919432"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
  event.preventDefault();


  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "MM/DD/YYYY").format("X");
  var freq = $("#frequency-input").val().trim();

  
  newTrain = {
      train: trainName,
      dest: destination,
      firstArrival: firstTrain,
      frequency: freq,
      
  };


  database.ref().push(newTrain);


  console.log(newTrain.train);
  console.log(newTrain.dest);
  console.log(newTrain.firstArrival);
  console.log(newTrain.frequency);

  alert("Train successfully added");


  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());


  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().firstArrival;
  var freq = childSnapshot.val().frequency;

 
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(freq);

  var trainTime = moment();
  
  var firstArrival =  moment(firstTrain, "HH:mm A").subtract(1, "years");

  var difference = moment().diff(moment(firstArrival), "minutes");

  var remainder = difference % firstTrain;

  var timeLeft = freq - remainder

  var nextArrival = moment().add(timeLeft, "m").format("HH:mm: A");


  var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(freq),
      $("<td>").text(firstTrain),
      $("<td>").text(minUntil),
  );


  $("#train-table > tbody").append(newRow);
});

});
