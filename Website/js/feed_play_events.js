
// Show Device Name //
var DeviceRef = firebase.database().ref("DEVICE");

DeviceRef.on("child_added", snap => {
   
    var mainName = snap.child("mainName").val();
//    console.log(mainName);
    $("#DeviceName").html("<strong>Device:</strong>&nbsp;&nbsp;" + mainName);
    
});

// Show Toy Position //
var ToyRef = firebase.database().ref("TOY");
ToyRef.on("value", function(snapshot) {
    var pos = snapshot.child("position").val();
//    console.log(pos);
    $("#Pos").html("Position:&nbsp;&nbsp;" + pos);
});

// Show Lasted Feed //
var FeedRef = firebase.database().ref("FEED");

FeedRef.orderByKey().on("child_added", snap => {
    
    
    var feedDate = snap.child("feedDate").val();
    var feedTime = snap.child("feedTime").val();
    
    //console.log(feedDate);
    //console.log(feedTime);
    
    $("#LastedFeed").html("Lasted:&nbsp;&nbsp;" + feedDate + ",&nbsp" + feedTime);
    
});


// Control //

function ControlToy01() {
    console.log("Toy01");
    var ToyRef = firebase.database().ref("TOY");
    var PlayRef = firebase.database().ref("PLAY");
    ToyRef.update({ Button: 1, Status: "on" });
    PlayRef.push({
        playDate: date,
        playTime: time
    });
};
function ControlToy02() {
    console.log("Toy02");
    var ToyRef = firebase.database().ref("TOY");
    var PlayRef = firebase.database().ref("PLAY");
    ToyRef.update({ Button: 2, Status: "on" });
    PlayRef.push({
        playDate: date,
        playTime: time
    });
}; 
function ControlToy03() {
    console.log("Toy03");
    var ToyRef = firebase.database().ref("TOY");
    var PlayRef = firebase.database().ref("PLAY");
    ToyRef.update({ Button: 5, Status: "on" });
    PlayRef.push({
        playDate: date,
        playTime: time
    });
}; 
function ControlToy04() {
    console.log("Toy04");
    var ToyRef = firebase.database().ref("TOY");
    var PlayRef = firebase.database().ref("PLAY");
    ToyRef.update({ Button: 10, Status: "on" });
    PlayRef.push({
        playDate: date,
        playTime: time
    });
}; 



var posVal;
var ToyRef = firebase.database().ref("TOY");
ToyRef.on("value", function(snapshot) {
    posVal = snapshot.child("position").val();
    //console.log(posVal);
});

function ControlLeft() {
    //console.log("Left");
    var ToyRef = firebase.database().ref("TOY");
    ToyRef.update({
        position: posVal-=30
    });    
};
function ControlRight() {
    //console.log("Right");
    var ToyRef = firebase.database().ref("TOY");
    ToyRef.update({
        position: posVal+=30
    });    
};
function ControlZero() {
    //console.log("Set Zero");
    var ToyRef = firebase.database().ref("TOY");
    ToyRef.update({
        position: 90
    });    
};



// Control Feeder //
var timestamp = new Date();
var key = timestamp.toDateString();
var date = timestamp.toLocaleDateString("th-TH");
//console.log("DATE: " + date);
console.log("DATE: " + timestamp.toDateString());
var time = timestamp.toLocaleTimeString("th-TH");
console.log("TIME: " + time);

function ClickFeed() {
    console.log("Feed");
    var FeedRef = firebase.database().ref("FEED");
    var FeedStatusRef = firebase.database().ref("FEED_STATUS");
    FeedStatusRef.update({ status: "on" });
    FeedRef.push({
        feedDate: date,
        feedTime: time,
        push_status: "No"
    });
    
};


var key = timestamp.toDateString();
function ClickCamera() {
    console.log("camera");
    var imgRef = firebase.database().ref("IMAGE").child(key);;
    imgRef.push({
        imgDate: date,
        imgTime: time,
    });
}