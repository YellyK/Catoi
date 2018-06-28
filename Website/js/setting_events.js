window.onload = function() {
    var firebaseRef = firebase.database().ref("USER");
    firebaseRef.once('value').then(function (dataSnapshot) {
        console.log(dataSnapshot.val());  
    });
};

///////////////////////////////////////////////////////////////

// DeviceSave //

var MainCode = document.getElementById("MainCode");
var ToyCode = document.getElementById("ToyCode");
var FeederCode = document.getElementById("FeederCode");
var MainName = document.getElementById("MainName");
var ToyName = document.getElementById("ToyName");
var FeederName = document.getElementById("FeederName");

function ClickSave() {
    window.alert("Save Successful!");
    var DeviceRef = firebase.database().ref("DEVICE");
//    var DeviceChRef = DeviceRef.child();
    DeviceRef.child("device01").update({
        mainID: MainCode.value,
        mainName: MainName.value,
        toyID: ToyCode.value,
        toyName: ToyName.value,
        feederID: FeederCode.value,
        feederName: FeederName.value
    });    
};

///////////////////////////////////////////////////////////////////

// ProfileSave //

var Email = document.getElementById("Email");
var Name = document.getElementById("Name");
var Surname = document.getElementById("Surname");
var Wifi = document.getElementById("Wifi");
var WifiPwd = document.getElementById("WifiP");


function ClickSaveP() {
    window.alert("Save Successful!");
    var UserRef = firebase.database().ref("USER");
//    var DeviceChRef = DeviceRef.child();
    // Create a new ref and log it’s push key
    UserRef.child("user01").update({
        email: Email.value,
        name: Name.value,
        surname: Surname.value,
        WifiName: Wifi.value,
        WifiPassword: WifiPwd.value
    });    
};

////////////////////////////////////////////////////////////////////

// PasswordSave //

var pwd = document.getElementById("NewPwd1");

function ClickSavePwd() {
    window.alert("Save Successful!");
    var UserRef = firebase.database().ref("USER");
//    var DeviceChRef = DeviceRef.child();
    // Create a new ref and log it’s push key
    UserRef.child("user01").update({
        password: pwd.value,
    });    
};

////////////////////////////////////////////////////////////////////

//Show data to Profile//
var UsernameRef = firebase.database().ref().child("USER");

UsernameRef.on("child_added", snap => {
    
    var user = snap.child("username").val();
    var email = snap.child("email").val();
    var name = snap.child("name").val();
    var sur = snap.child("surname").val();
    var wifi = snap.child("WifiName").val();
    var wifipwd = snap.child("WifiPassword").val();
    
    $("#Username").text(user);
    $('input[name=Email]').val(email);
    $('input[name=Name]').val(name);
    $('input[name=Surname]').val(sur);
    $('input[name=WiFi]').val(wifi);
    $('input[name=WiFiP]').val(wifipwd);
    
    
});

//Show data to Device//
var DeviceRef = firebase.database().ref("DEVICE");

DeviceRef.on("child_added", snap => {
   
    var mainName = snap.child("mainName").val();
    var toyName = snap.child("toyName").val();
    var feederName = snap.child("feederName").val();
    
    $("#Main").text(mainName);
    $("#Toy").text(toyName);
    $("#Feeder").text(feederName);
    
});

//Show data to DeviceEdit//
var DeviceRef = firebase.database().ref("DEVICE");

DeviceRef.on("child_added", snap => {
    
    var mainName = snap.child("mainName").val();
    var toyName = snap.child("toyName").val();
    var feederName = snap.child("feederName").val();
    var mainID = snap.child("mainID").val();
    var toyID = snap.child("toyID").val();
    var feederID = snap.child("feederID").val();
    
    $('input[name=MainCode]').val(mainID);
    $('input[name=ToyCode]').val(toyID);
    $('input[name=FeederCode]').val(feederID);
    $('input[name=MainName]').val(mainName);
    $('input[name=ToyName]').val(toyName);
    $('input[name=FeederName]').val(feederName);
    
});

