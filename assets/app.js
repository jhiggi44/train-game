    var config = {
    apiKey: "AIzaSyAVbnvTQDnyfEzBGnaFl7Xm_Z7xJrFrCh8",
    authDomain: "train-ga.firebaseapp.com",
    databaseURL: "https://train-ga.firebaseio.com",
    projectId: "train-ga",
    storageBucket: "train-ga.appspot.com",
    messagingSenderId: "77991528048"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destinationName = "";
  var firstTime = "";
  var frequencyRate = "";
  var timeFormat = "HH:mm";

  


  $("#submitButton").on("click", function() {
      event.preventDefault();

      var trainName = $("#trainName").val().trim();
      var destinationName = $("#destinationName").val().trim();
      var firstTime = moment($("#firstTime").val().trim(), "HH:mm").format("X");
      var frequencyRate = $("#frequencyRate").val().trim();

  // Creates an object to hold newTrain data
  var newTrain = {
    name: trainName,
    destination: destinationName,
    start: firstTime,
    frequency: frequencyRate
  };

  // Uploads newTrain data to firebase
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destinationName").val("");
  $("#firstTime").val("");
  $("#frequencyRate").val("");
});


// 3. Create Firebase event for adding newTrain to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destinationName = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().start;
  var frequencyRate = childSnapshot.val().frequency;

  firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  currentTime = moment();
  diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  timeRemaining = diffTime % frequencyRate;
  minutesAway = frequencyRate - timeRemaining;
  nextTrain = moment().add(minutesAway, "minutes");
  nextTrainFormatted = moment(nextTrain).format("HH:mm");




 


  // Add each train's data into the table
  $("#tableDisplay").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
  frequencyRate + "</td><td>" + nextTrainFormatted + "</td><td>" + minutesAway + "</td></tr>");
  
  });
  	