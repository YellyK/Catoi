$(document).ready(function() {
    var feedtable = $('#FeedTable').DataTable();
    var FeedRef = firebase.database().ref("FEED");
    FeedRef.on('child_added',function(datos){
        var feed = datos.val();
        var dataSet=[feed.feedDate,feed.feedTime];
        feedtable.rows.add([dataSet]).draw();
    });

});

$(document).ready(function() {
    var playtable = $('#PlayTable').DataTable();
    var PlayRef = firebase.database().ref("PLAY");
    PlayRef.on('child_added',function(snapshot){
        var play = snapshot.val();
        var dataSet=[play.playDate,play.playTime];
        playtable.rows.add([dataSet]).draw();
    });

});

$(document).ready(function() {
    var feedtable = $('#FeedTable02').DataTable();
    var FeedRef = firebase.database().ref("FEEDSTAT");
    FeedRef.on('child_added',function(datos){
        var feedstat = datos.val();
        var dataSet=[feedstat.feedDate,feedstat.feedFreq, feedstat.feedAmount];
        feedtable.rows.add([dataSet]).draw();
    });

});

$(document).ready(function() {
    var feedtable = $('#PlayTable02').DataTable();
    var FeedRef = firebase.database().ref("PLAYSTAT");
    FeedRef.on('child_added',function(datos){
        var playStat = datos.val();
        var dataSet=[playStat.playDate,playStat.playFreq];
        feedtable.rows.add([dataSet]).draw();
    });

});

// Declare Variable //

var FeedRef = firebase.database().ref("FEED");
var PlayRef = firebase.database().ref("PLAY");
var timestamp = new Date();
var date = timestamp.toLocaleDateString("th-TH");
var key = timestamp.toDateString();


// Show Lasted Feed //
FeedRef.orderByKey().on("child_added", snap => {
   
    var feedDate = snap.child("feedDate").val();
    var feedTime = snap.child("feedTime").val();
    
    //console.log(feedDate);
    //console.log(feedTime);
    
    $("#feedDate").html(feedDate);
    $("#feedTime").html(feedTime);
    
});

// Counting Feed Frequency & Amount //

var countFeed = 0;
var countAmount = 0;
FeedRef.on("child_added", snap => {
   
    var feedDate = snap.child("feedDate").val();
    
    if (feedDate == date){
        countFeed++;
    }
    //console.log(countFeed);
    $("#feedFreq").html(countFeed);
    
    countAmount = countFeed*30;
    $("#feedAmount").html(countAmount + " g");
    

});

// Counting Play Frequency //

var countPlay = 0;
PlayRef.on("child_added", snap => {
   
    var PlayDate = snap.child("playDate").val();
    
    if (PlayDate == date){
        countPlay++;
    }
    console.log(countPlay);
    $("#playFreq").html(countPlay);

});


// Calculate Feed Stat //
var feedFreq = 0;
var feedAmount = 0;
var FeedStat = firebase.database().ref('FEEDSTAT').child(key);

FeedRef.orderByChild('feedDate').equalTo(date).on("value", function(snapshot) {
    console.log(snapshot.numChildren()); // Number of records
    feedFreq = snapshot.numChildren();
    feedAmount = feedFreq*30;
    
    FeedStat.set({
        feedDate: date,
        feedFreq: feedFreq,
        feedAmount: feedAmount
    });
});

// Calculate Play Stat //
var playFreq = 0;    
var playStat = firebase.database().ref('PLAYSTAT').child(key);    
PlayRef.orderByChild('playDate').equalTo(date).on("value", function(snapshot){
    console.log(snapshot.numChildren());
    playFreq = snapshot.numChildren();
    
    playStat.set({
        playDate: date,
        playFreq: playFreq
    });
});    




//var ctx = document.getElementById('FeedChart').getContext('2d');
//var chart = new Chart(ctx, {
//    // The type of chart we want to create
//    type: 'line',
//    
//    FeedRef.on('child_added', function(datos){
//        var feed = datos.val();
//
//        // The data for our dataset
//        data: {
//            labels: [feed.feedDate],
//            datasets: [{
//                label: "Feed Frequency",
//                backgroundColor: 'rgb(255, 99, 132)',
//                borderColor: 'rgb(255, 99, 132)',
//                data: [feed.feedFreq],
//            }]
//        },
//
//        // Configuration options go here
//        options: {}
//    });
//});







